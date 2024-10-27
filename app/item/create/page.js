"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/utils/useAuth";

export default function CreateItem(){
  const [createItem, setItem] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    email: "dummy2@gmail.com"
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/item/create", {
        method: "POST",
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
      alert("アイテム作成失敗");
    }
  }

  if(loginUserEmail){
    return (
      <div>
        <h1>アイテム作成</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="アイテム名" required />
          <input type="text" name="price" onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="価格" required />
          <input type="text" name="image" onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="画像" required />
          <textarea name="description" rows={15}  onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="商品説明" required></textarea>
          <button>作成</button>
        </form>
      </div>
    );
  }
}