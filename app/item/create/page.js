import MyPage from "@/app/item/create/myPage";

export function generateMetadata(){
  return {
    title: "アイテム作成",
    description: "アイテム作成のページです"
  }
}

export default function CreateItem(){
  return (
    <MyPage />
  );
}