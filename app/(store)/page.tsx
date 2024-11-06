import BlackFridayBanner from "@/components/black-friday-banner"
import ProductsView from "@/components/products-view"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { getAllProducts } from "@/sanity/lib/products/getAllProducts"

export default async function Home() {
  const products = await getAllProducts()
  const categories = await getAllCategories()

  // console.log(
  //   crypto.randomUUID().slice(0, 5) +
  //   `>>> Rendered the home page cache with ${products.length} products and ${categories.length} categories`
  // )
  return (
    <div>
      <BlackFridayBanner />

      {/* render all products */}
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  )
}
