import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { getSkills } from "../api";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";

export default function About() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true)
    try {
      const data = await getSkills();
      setSkills(data);
      console.log(data);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching skills:", error);
      setIsLoading(false)

    }
  };

  // Filter skills where id === 1
  const filteredSkills = skills.filter(
    (skill) =>
      skill.id === 72 ||
    skill.id === 73  ||
    skill.id === 74  ||
    skill.id === 75  ||
    skill.id === 76  ||
    skill.id === 77  ||
    skill.id === 78  ||
    skill.id === 79  ||
    skill.id === 80  ||
    skill.id === 81   ||
    skill.id === 82   ||
    skill.id === 83   ||
    skill.id === 84   ||
    skill.id === 85  ||
    skill.id === 86
  );

  return (
    <div className="h-full p-4 flex items-center justify-center">
      {isLoading? <Loading/> :(<div className="grid grid-cols-1 gap-4 w-full max-w-7xl">
        <div className="text-center grid grid-cols-10 justify-center">
          {/* Left Div (70% width) */}
          <div className="col-span-6 p-2 bg-emerald-800 custom-shadow">
            <h1 className="text-3xl font-semibold mb-1 text-white">About Me</h1>
            <p className="text-gray-200 ">
              Hi, I'm a passionate web developer with expertise in React,
              Tailwind CSS, and modern web technologies. Full Stack Developer,
              developing and designing responsive web applications, using modern
              frameworks and new technologies for frontend and backend
              development, enjoying collaborating with teams and learning more
              skills as a Full Stack Developer.
            </p>
            <button className="bg-green-600 rounded-lg float-left ml-2 text-white shadow-md shadow-green-400 py-2 px-4">
              Get CV
            </button>
          </div>
          {/* Right Div (30% width) */}
          <div className="col-span-4 flex items-center justify-end">
            <img
              src="./pro.png"
              alt="profil"
              className="w-60 custom-shadow rounded-full shadow-lg shadow-teal-700"
            />
          </div>
        </div>

        {/* Languages Div */}
        <div className="py-4 languages">
          <div className="flex  bg-white opacity-85 py-2  gap-4">
            {filteredSkills.map((skill) => {
              console.log(skill);
              return (
                <div
                  key={skill.id}
                  className="  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    className="w-14"
                    src={"http://127.0.0.1:8000/storage/"+skill.picture}
                    alt="lang"
                  />
                </div>
              );
            })}
            <Link to="/skills" className="text-blue-700">
              See More
            </Link>
          </div>
        </div>
      </div>)}
    </div>
  );
}
