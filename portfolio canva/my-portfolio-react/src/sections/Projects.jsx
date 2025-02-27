import React, { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../api";
import AddProject from "../components/AddProject";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Loading } from "../components/Loading";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // State for full-screen image

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleProjectAdded = () => {
    fetchProjects();
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      {isLoading ? (
        <Loading/>
      ) : (
        <div className="text-center mt-20 w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl text-white ml-4  mb-8">Projects</h1>
            {localStorage.getItem("token") && <button
              onClick={() => setIsModalOpen(true)}
              className="text-white px-4 py-2 rounded mb-8"
            >
              Add Project
            </button>}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white  shadow-lg w-full max-w-md">
                <AddProject onProjectAdded={handleProjectAdded} />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Swiper Carousel for Projects */}
          <div className="p-4 relative"> {/* Add relative to create a stacking context */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="p-1  shadow-lg bg-white relative"> {/* Add relative here */}
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>

                    <img
                      src={`http://localhost:8000/storage/${project.picture}`}
                      alt={project.name}
                      className="w-full h-32 object-cover mb-2  cursor-pointer"
                      onClick={() =>
                        setSelectedImage(
                          `http://localhost:8000/storage/${project.picture}`
                        )
                      }
                    />

                    <p className="text-gray-700 text-sm mb-2">
                      {project.category}
                    </p>

                    <div className="flex justify-between py-6">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Project
                      </a>
                      <a
                        href={project.link_github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:underline text-sm"
                      >
                        GitHub
                      </a>
                    </div>

                    {/* Delete Button with higher z-index */}
                   {localStorage.getItem("token") && <button
                      onClick={() => handleDelete(project.id)}
                      className="mt-2 z-[100] bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 absolute bottom-14 right-2"
                    >
                      Delete
                    </button>}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Fullscreen Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt="Full Size"
                className="w-[600px] h-[90vh] object-contain rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}