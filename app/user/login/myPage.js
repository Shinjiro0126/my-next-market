"use client"
import { useState } from "react";

export default function Login(){
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Context-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token);
      alert(jsonData.message);
    } catch {
      alert("ログインできませんでした")
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => SetEmail(e.target.value)} type="text" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="メールアドレス" required />
        <input value={password} onChange={(e) => SetPassword(e.target.value)} type="text" name="passwords" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="パスワード" required />
        <button>ログイン</button>
      </form>
    </div>
  );
}