//import { categoriesData } from "@/data";
import Link from "next/link";
import { Tcategory } from "@/app/types";

const getCategories = async (): Promise<Tcategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);

    if (res.ok) {
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function CategoriesList() {
  const categories = await getCategories();
  //console.log(categoriesData);
  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categories &&
        categories.map((category) => (
          <Link
            key={category.catName}
            className="px-4 py-1 rounded-md bg-slate-800 text-white 
          cursor-pointer hover:bg-slate-900/100 transition"
            href={`/categories/${category.catName}`}
          >
            {category.catName}
          </Link>
        ))}
    </div>
  );
}
