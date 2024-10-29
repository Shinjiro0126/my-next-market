import MyPage from "@/app/item/update/[id]/myPage";

export async function generateMetadata(context){
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${context.params.id}`, {cache: "no-store"});
  const jsonData = await response.json();
  const singleItem = jsonData.singleItem;
  return {
    title: singleItem.title,
    description: singleItem.description
  }
}

export default function UpdateItem(context){
  return <MyPage {...context} />
}