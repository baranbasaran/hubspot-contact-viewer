import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";
import Sidebar from "./components/layout/Sidebar";
import CreateContactForm from "./components/CreateContactForm";
import "./styles.css";

const queryClient = new QueryClient();

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAddContact = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen w-full bg-background">
          <Header />

          <main className="w-full">
            <div className="max-w-[1600px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex gap-8">
                <MainContent onAddContact={handleAddContact} />
                <Sidebar onAddContact={handleAddContact} />
              </div>
            </div>
          </main>

          <CreateContactForm
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </div>
      </QueryClientProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
