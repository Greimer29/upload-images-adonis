'use strict'

class ImageController {
  async upload({request,response}){
    const image = request.file("image",{
      types:["image"],
      size:"2mb"
    })
//${new Date().getTime()}
    await image.move('public/avatar',{
      name:`${image.clientName}`,
      overwrite: true
    })
    if(!image.moved()){
      return response.status(500).send({error:image.error()})
    }
    return response.status(200).send({message:"imagen subida con exito", imageURL:image.fileName})
  }
}

module.exports = ImageController
