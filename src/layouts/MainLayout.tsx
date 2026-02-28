import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="p-4 bg-gray-200 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Recipes</h1>
      </header>

      <main className="flex-1 flex p-4">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 w-full rounded-3xl">
          <Outlet />
        </div>
      </main>

      <footer className="p-4 bg-gray-200 text-center mt-auto">
        © 2026 Recipe App Patryk Plizga
      </footer>
    </div>
  );
};

export default MainLayout;
