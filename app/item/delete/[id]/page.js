"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";

export default function DeleteItem(context){
  const [createItem, setItem] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    email: ""
  })

  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleChange = (e) => {
    setItem({
      ...createItem,
      [e.target.name]: e.target.value,
      email: loginUserEmail
    })
  }

  useEffect(() => {
    const getSingleItem = async(id) => {
      const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`, {chache: "no-store"})
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      
      setItem({
        title: singleItem.title,
        price: singleItem.price,
        image: singleItem.image,
        description: singleItem.description,
        email: singleItem.email
      })
    }
    getSingleItem(context.params.id);
  }, [context])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/item/delete/${context.params.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(createItem)
      })

      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("アイテム削除失敗");
    }
  }

  if(loginUserEmail === email){
    return (
      <div>
        <h1>アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{createItem.title}</h2>
          <Image src={createItem.image} width={750} height={500} />
          <h3>¥{createItem.price}</h3>
          <p>{createItem.description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>
  }
}