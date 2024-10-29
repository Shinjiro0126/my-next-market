"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/utils/useAuth";

export default function UpdateItem(context){
  const [createItem, setItem] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    email: ""
  })
  const [loading, setLoading] = useState(false);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {chache: "no-store"})
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      
      setItem({
        title: singleItem.title,
        price: singleItem.price,
        image: singleItem.image,
        description: singleItem.description,
        email: singleItem.email
      })
      setLoading(true);
    }
    getSingleItem(context.params.id);
  }, [context])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, {
        method: "PUT",
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
      alert("アイテム編集失敗");
    }
  }

if(loading){
  if(loginUserEmail === createItem.email){
    return (
      <div>
        <h1>アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={createItem.title} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="アイテム名" required />
          <input type="text" name="price" value={createItem.price} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="価格" required />
          <input type="text" name="image" value={createItem.image} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="画像" required />
          <textarea name="description" rows={15} value={createItem.description}  onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="商品説明" required></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>
  }
} else {
  return <h1>ローディング中...</h1>
}
}