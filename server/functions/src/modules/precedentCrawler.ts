import { crawlTarget } from '../configs';
import filterPrecedentType from '../utils/precedentTypeFilter'
import lengthFilter from '../utils/lengthFilter'
import {Browser, ElementHandle, EvaluateFn, Page} from "puppeteer";

class PrecedentCrawler {
  constructor(private browser:Browser, private page:Page) {
    this.browser = browser;
    this.page = page;
  }

  public async shutCrawlerDown() {
    await this.page.waitForTimeout(2000)
    await this.page.close()
    await this.browser.close()
  }

  public async getTargetPrecedentsLength(type: 'issue'|'recent') {
    await this.setScrapTarget(type)
    const supremeCourtBtn = await this.page.$('#groupList>li.last ul>li:nth-child(1) a')
    if (supremeCourtBtn) {
        const precedentLength = await supremeCourtBtn.evaluate<EvaluateFn>(elem => elem.innerText.replace(/(대법원\(|\))/g,''));
        return +precedentLength
    } else {
        // throw
        return 0
    }
  }

  // recent는 마지막으로 크롤링된 판례수를 참조해 최신만 긁음
  // 얼마나 긁을지는 밖에서 준 limit으로 판단
 public async scrapRecentPrecedents(type:'issue'|'recent', limit:number) {
    await this.setScrapTarget('recent')
    let sections = await this.getPrecedentSections();
    return await this.scrapPrecedentSections(sections.slice(0, limit));
  }

  // all은 최신 여부에 상관없이 있는거 걍 다 긁음
  public async scrapAllPrecedents(type:'issue'|'recent') {
    await this.setScrapTarget(type)
    const pageCounts = await this.getTargetPageCount()
    let result:any[] = []
    for(let i = 1; i <= pageCounts; i++) {
      let sections = await this.getPrecedentSections()
      const pageResult = await this.scrapPrecedentSections(sections)
      result = [...result, ...pageResult]
      await this.moveToNextTargetPage()
    }
    return result;
  }

  private async setScrapTarget(type: 'issue' | 'recent') {
    await this.page.goto(crawlTarget)
    await this.page.waitForTimeout(2000)
    if (type === 'recent') {
        await this.setIssueTap()
    }
    await this.setViewLength(80);
    await this.setSupremeCourtView();
  }

  private async setIssueTap() {
      const recentBtn = await this.page.$('.bg_1.ml__1')
      if (recentBtn) {
          await recentBtn.click()
      }
      await this.page.waitForTimeout(3000)
  }

  private async setViewLength(precedentLength:20|40|80){
      const targetChildNum = lengthFilter(precedentLength)
      await this.page.evaluate(async(targetChildNum) => {
          const pagingSelect:HTMLOptionElement|null = document.querySelector(`.select_2.ml_4 option:nth-child(${targetChildNum})`)
          if(pagingSelect) {
              pagingSelect.selected = true
          }
      }, targetChildNum)

      const applyBtn = await this.page.$('fieldset.f_left>a')
      if (applyBtn) await applyBtn.click()
      await this.page.waitForTimeout(3000)
  }

  private async setSupremeCourtView() {
    const supremeCourtBtn = await this.page.$('#groupList>li.last ul>li:nth-child(1) a')
    if(supremeCourtBtn) {
      await supremeCourtBtn.click()
    }
    await this.page.waitForTimeout(3000)
  }

  private async getTargetPageCount() {
    let pagingElem = await this.page.$('p.list_location')
    if(pagingElem) {
        let pageCounts = await pagingElem.evaluate<EvaluateFn>(elem => elem.innerText.trim().split('/')[1]);
        return parseInt(pageCounts, 10)
    }
    return 0
  }

  private async getPrecedentSections() {
    return await this.page.$$('#areaList>tr')
  }

  private async scrapPrecedentSections(sections:ElementHandle[]) {
    const unfilteredResult = await Promise.all(sections.map((section) => this.scrapPrecedentSection(section)));
    return unfilteredResult.filter(precedent => Object.values(precedent).every((value) => value));
  }

  private async scrapPrecedentSection(section:ElementHandle) {
      const { name, type } = await this.scrapPrecedentNameAndType(section);
      const url = await this.scrapPrecedentUrl(section);
      const content = await this.scrapPrecedentContent(section);
      return {name, type, url, content}
  }

  private async scrapPrecedentNameAndType(section:ElementHandle) {
      let name = '', type = '';
      const titleElem = await section.$('td:nth-child(2)>dl>dt>a>strong>strong')
      if (titleElem) {
          name = await titleElem.evaluate<EvaluateFn>((elem:HTMLElement) => elem.innerText)
          const classifyString = name.match(/\d+[가-힣]+\d+/)
          type = filterPrecedentType(classifyString !== null ? classifyString[0].replace(/\d/g,'') : '')
      }
      return {name, type}
  }

  private async scrapPrecedentUrl(section:ElementHandle) {
      let url = '';
      const urlElem = await section.$('td:nth-child(2)>dl>dt>a:nth-child(2)')
      if (urlElem) {
         url = await urlElem.evaluate<EvaluateFn>((elem:HTMLElement) => elem.id.split('_')[1])
      }
      return url
  }

  private async scrapPrecedentContent (section:ElementHandle) {
      await section.evaluate((elem) => {
          const contentRevealButton :HTMLElement|null = elem.querySelector('td:nth-child(2)>dl>dt>a:nth-child(2)')
          if (contentRevealButton) {
              contentRevealButton.click()
          }
      })

      await this.page.waitForTimeout(5000)

      let content = ''
      const contentElem = await section.$('td:nth-child(2)>dl>dd:nth-child(2)>dl>dd')
      const contentText = await contentElem?.evaluate<EvaluateFn>((elem:HTMLElement) =>elem.innerHTML);
      if (contentText) {content = contentText}
      return content
  }


  private async moveToNextTargetPage() {
    const nextPageBtn = await this.page.$('p.list_location a:nth-child(3)')
    if(nextPageBtn) {
      await nextPageBtn.click()
      await this.page.waitForTimeout(3000)
    }
  }
}

export default PrecedentCrawler;
