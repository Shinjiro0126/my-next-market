"use client"
import { useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function Register(){
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Context-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch {
      alert("ユーザー登録失敗");
    }
  }

  return(
    <>
    <div>
      <h1 className="text-4xl font-bold">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={newUser.name} onChange={handleChange} type="text" name="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="名前" required />
        <input value={newUser.email} onChange={handleChange} type="text" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="メールアドレス" required />
        <input value={newUser.password} onChange={handleChange} type="text" name="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="パスワード" required />
        <button>登録</button>
      </form>
    </div>
    </>
  );
}