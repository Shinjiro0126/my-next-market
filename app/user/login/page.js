import MyPage from "@/app/user/login/myPage";

export function generateMetadata(){
  return {
    title: "ログイン",
    description: "ログイン画面です"
  }
}

export default function Login(){
  return (
    <MyPage />
  );
}