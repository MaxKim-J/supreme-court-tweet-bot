// br 단위로 트윗을 나눈다

const parseContent = (content:string) => content.split('<br>').filter((line:string) => line)

const convertPrecedentToTweet = (data:any):any[] => {
  const result:any[] = []
  parseContent(data.content).forEach((content, index) => {
    result.push({
      ...data,
      id: `${data.url}-${index+1}`,
      content,
      uploadedAt:false,
    })
  })

  // 트윗 여러개 리턴
  return result
}

export default convertPrecedentToTweet
