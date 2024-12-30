import Categories from "./_components/Categories.jsx";
import Slider from "./_components/Slider.jsx";
import Products from "./_components/pages/Products.jsx";
import Banner from "./_components/Banner.jsx";
import Footer from "./_components/Footer.jsx";

export default function Home() {
  return (
    <div>
      <section className="container flex gap-6 mx-auto">
        <Categories />
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Busca tu producto"
              className="w-[40%] px-4 py-3 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main_celeste focus:border-main_celeste"
            />
            <button className="px-6 py-3 text-lg text-white rounded-md shadow-lg bg-main_verde hover:bg-main_verde/90">
              Buscar
            </button>
          </div>
          <Slider />
        </div>
      </section>

      {/* SECCION DE PRODUCTOS */}
      <div className="container mx-auto mb-12">
        <h1 className="text-center title">Productos destacados</h1>

        <Products />
      </div>
      <div className="container mx-auto mb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Banner
            bannerStyles="flex items-center justify-between p-6 bg-blue-100 rounded-lg shadow-md"
            title="Summer Fruit"
            description="100% Pure Natural Fruit Juice"
            image="/banner1.png"
          />
          <Banner
            bannerStyles="flex items-center justify-between p-6 bg-yellow-100 rounded-lg shadow-md"
            title="Dried & Drink Fruits"
            description="With 25% Off All Teas"
            image="/banner2.png"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
