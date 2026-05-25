import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 overflow-hidden font-sans">
      <div className="w-full max-w-[390px] h-[844px] bg-[#F8FAFC] relative shadow-2xl sm:rounded-[40px] sm:overflow-hidden sm:border-8 border-black ring-1 ring-white/10">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
