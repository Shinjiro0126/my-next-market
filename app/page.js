
import Link from "next/link";
import Image from "next/image";

const getAllItems = async() => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {
      cache: "no-store"
    });
    const jsonData = await response.json();
    const allItems = jsonData.allItems;
    return allItems;
  } catch {
    return null;
  }
}

export default async function ReadAllItems(){
  console.log(process.env.NEXT_PUBLIC_URL);
  const allItems = await getAllItems();

  if(!allItems){
    return <h2 className="text-2xl">データを取得できませんでした。</h2>
  }
  return (
    <div>
      {allItems.map(item => (
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image src={item.image} width={750} height={500} alt={item.title} />
          <h2>¥{item.price}</h2>
          <h3>{item.title}</h3>
          <p>{item.description.substring(0, 80)}...</p>
        </Link>
      ))}
    </div>
  );
}