import { useState } from "react";

export default function ImgInput(props){
  const [imageFile, setImageFile] = useState("");

  const handleClick = async() => {
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "ehbtdxf4");  // cloudinaryのアップロード設定
      data.append("cloud_name", "ddksgx562");

      const response = await fetch("https://api.cloudinary.com/v1_1/ddksgx562/image/upload", {
        method: "POST",
        body: data
      });

      const jsonData = await response.json();
      console.log(jsonData.url);
      props.setImage(jsonData.url); // 画像URLをCreateItemに渡す
      alert("画像アップロード成功");
    } catch {
      alert("画像アップロード失敗");
    }
  }

  return (
    <div className="img-input">
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/png, image/jpg" />
      <button onClick={handleClick} disabled={!imageFile}>画像アップロード</button>
    </div>
  );
}
