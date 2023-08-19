'use client'
import axios from "axios";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import hexagon from "../../hexagon.png";
import star from "../../star.png";



export default function ProfilePage() {

  const[userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const storeduserEmail = localStorage.getItem("userEmail");
      setUserEmail(storeduserEmail || "");
    }
  }, []);

  const router = useRouter();
  interface Skill {
    skill: string;
  }
  interface Experience {
    fromYear: string;
    toYear: string;
    organization: string;
    detail: string;
  }
  interface Education {
    fromYear: string;
    degree: string;
    toYear: string;
    organization: string;
    detail: string;
  }

  interface Certificates {
    language: string;
    organization: string;
  }

  interface User {
    _id: string;
    userProfile: string;
    name: string;
    phone: string;
    bio: string;
    skills: Skill[];
    certificates: Certificates[];
    experience: Experience[];
    education: Education[];
  }

  const profileImgInputRef = useRef(null);
  const [data, setData] = useState<User>({
    _id:'',
    userProfile: "",
    name: "",
    phone: "",
    bio: "",
    skills: [],
    certificates: [],
    experience: [],
    education: [],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [profileImg, setProfileImg] = useState(null);
  const [displayedProfileImg, setDisplayedProfileImg] = useState(null);
  const [userProfile, setUserProfile] = useState("");

  const [name, setName] = useState("");
  const [editname, setEditname] = useState(false);

  const [phone, setPhone] = useState("");
  const [editphone, setEditphone] = useState(false);

  const [bio, setBio] = useState("");
  const [editbio, setEditbio] = useState(false);

  const [skills, setSkills] = useState<Skill[]>([]);

  const [editskills, setEditskills] = useState(false);
  const [showSkill, setShowSkill] = useState(false);

  const [certificates, setCertificates] = useState<Certificates[]>([]);
  const [editcertificates, setEditcertificates] = useState(false);

  const [experience, setExperience] = useState<Experience[]>([]);
  const [editexperience, setEditexperience] = useState(false);

  const [education, setEducation] = useState<Education[]>([]);
  const [editeducation, setEditeducation] = useState(false);

  function convertFileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } else {
        resolve(null);
      }
    });
  }

  const [userDetail, setUserDetail] = useState({
    userEmail: "",
    userProfile: "",
    name: "",
    phone: "",
    bio: "",
    skills: [],
    certificates: [],
    experience: [],
    education: [],
  });

  const onchange = async (data: any) => {
    const Base64userProfile = await convertFileToBase64(profileImg);

    setUserProfile(Base64userProfile as string);
    setUserDetail((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/profile", userDetail);
      console.log("Upload success");
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 3000);
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(
          `/api/users/profile?userEmail=${userEmail}`
        );
        const userDetails = response.data.userDetail;
        setData(userDetails);
        setDisplayedProfileImg(userDetails.userProfile);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchUserDetails();
  }, [userEmail]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setProfileImg(file);
  };

  const handleAddSkillClick = () => {
    setShowSkill(true);
    setSkills([...skills, { skill: "" }] as Skill[]);
  };

  const handleDeleteSkill = (index: any) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSkillChange = ({
    index,
    e,
  }: {
    index: number;
    e: React.ChangeEvent<HTMLInputElement>;
  }) => {
    const updatedSkills = [...skills];
    updatedSkills[index].skill = e.target.value;
    setSkills(updatedSkills);
    onchange({
      userEmail,
      userProfile,
      name,
      phone,
      bio,
      skills: updatedSkills,
      certificates,
      experience,
      education,
    });
  };

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      { fromYear: "", toYear: "", organization: "", detail: "" },
    ]);
  };

  const handleDeleteExperience = (index: any) => {
    const updatedExperiences = [...experience];
    updatedExperiences.splice(index, 1);
    setExperience(updatedExperiences);
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updatedExperiences = [...experience];
    updatedExperiences[index][field] = value;
    setExperience(updatedExperiences);
    onchange({
      userEmail,
      userProfile,
      name,
      phone,
      bio,
      skills,
      certificates,
      experience: updatedExperiences,
      education,
    });
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      { fromYear: "", toYear: "", degree: "", organization: "", detail: "" },
    ]);
  };

  const handleDeleteEducation = (index: any) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
    onchange({
      userEmail,
      userProfile,
      name,
      phone,
      bio,
      skills,
      certificates,
      experience,
      education: updatedEducation,
    });
  };

  const handleAddCertificate = () => {
    setCertificates([...certificates, { language: "", organization: "" }]);
  };

  const handleDeleteCertificate = (index: any) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1);
    setCertificates(updatedCertificates);
  };

  const handleCertificateChange = (
    index: number,
    field: keyof Certificates,
    value: string
  ) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
    onchange({
      userEmail,
      userProfile,
      name,
      phone,
      bio,
      skills,
      certificates: updatedCertificates,
      experience,
      education,
    });
  };

  return (
    <div className="flex bg-gray-100 items-center justify-center  py-4">
      {loading && (
        <div className="loading z-50">
          <svg
            className="animate-spin"
            fill="none"
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
            />
          </svg>
          <p> Saving data...</p>
        </div>
      )}
      {success && (
        <div className="success z-70">
          <p>Your data has been successfully saved!</p>
        </div>
      )}

      <div className="lg:w-[80%] md:w-full sm:w-full md:h-[1900px] sm:h-[1900px] lg:h-[1000px] ml-auto bg-gray-100 items-top items-center  flex flex-col">
        <div
          className="flex w-[99%]  mt-3 sm:h-[9%] md:h-[13%] lg:h-[33%] rounded-lg  items-top"
          style={{ backgroundColor: "#1D267D" }}
        >
          <p className="flex mr-auto p-3">MY PROFILE</p>
        </div>
        <div className="lg:bg-white  lg:shadow-lg   text-black lg:shadow-lg  lg:w-[80%] lg:w-[80%] sm:w-[90%] rounded-lg lg:h-full sm:h-full md:h-full flex justify-start  items-top z-10 relative lg:top-[-120px] md:top-[-110px] sm:top-[-85px]">
          <div className="flex lg:flex-row sm:flex-col lg:justify-between  w-full max-w-full p-6">
            <div className="sm:bg-white flex flex-col lg:w-[45%] sm:w-[100%] lg:mr-5 sm:p-4 lg:p-0  sm:rounded-lg sm:mb-9">
              <div className="flex flex-row  mb-4 justify-center items-center">
                <div className="w-[125px] h-[125px] items-center flex justify-center relative border  rounded-full bg-white mr-4 overflow-hidden shadow-xl ">
                  {displayedProfileImg !== null && displayedProfileImg ? (
                    <img
                      src={displayedProfileImg} // Use displayedProfileImg here
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-lg flex bg-cover items-center justify-center h-full">
                      <img
                        src={
                          profileImg
                            ? URL.createObjectURL(profileImg)
                            : "https://i.pinimg.com/736x/5b/8f/3d/5b8f3d9f30460aeedbe6a235e2d001d3.jpg"
                        }
                      />
                    </span>
                  )}
                  <input
                    type="file"
                    ref={profileImgInputRef}
                    className="opacity-0 w-full h-full cursor-pointer absolute top-0 left-0"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="ml-auto rounded-full h-[18%] sm:w-[40%] md:w-[20%] lg:w-[30%] m-4 text-[12px] px-2"
                  style={{ backgroundColor: "#DBDFFD" }}
                >
                  Save changes
                </button>
              </div>
              <div className="mb-4 border border-gay-400 rounded-lg w-full py-4 px-4 shadow-lg">
                <p className="text-[13px] text-gray-800 mb-1">Your Name</p>
                <div className="flex mb-3">
                  {name.length > 0 ? (
                    <p className="text-[14px] text-black ">{name}</p>
                  ) : (
                    data && (
                      <p className="text-[14px] text-black ">{data.name}</p>
                    )
                  )}
                  <button
                    className="ml-auto rounded-full h-[18%] lg:w-[15%] md:w-[15%] sm:w-[25%] text-[12px] px-2"
                    style={{ backgroundColor: "#DBDFFD" }}
                    onClick={() => {
                      setEditname(true);
                    }}
                  >
                    edit
                  </button>
                  {editname && (
                    <div className="flex flex-col w-full h-full ml-auto items-center justify-center editInputs absolute z-10">
                      <label className=" mr-auto mb-2">your name:</label>
                      <input
                        className="text-black w-1/2 mb-3 mr-auto px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                        onChange={(e) => {
                          setName(e.target.value);
                          onchange({
                            userEmail,
                            userProfile,
                            name: e.target.value,
                            phone,
                            bio,
                            skills,
                            certificates,
                            experience,
                            education,
                          });
                        }}
                      />
                      <button
                        className="border border-black rounded-lg px-2"
                        onClick={() => {
                          setEditname(false);
                        }}
                        style={{ backgroundColor: "#1D267D" }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-[13px] text-gray-800 mb-1">Email</p>
                <div className="flex mb-3">
                  <p className="text-[14px]">{userEmail}</p>
                </div>
                <p className="text-[13px] text-gray-800 mb-1">Phone Number</p>
                <div className="flex mb-3">
                  {phone.length > 0 ? (
                    <p className="text-[14px]"> +(91) {phone}</p>
                  ) : (
                    data && <p className="text-[14px]"> +(91) {data.phone}</p>
                  )}
                  <button
                    className="ml-auto rounded-full h-[18%] lg:w-[15%] md:w-[15%] sm:w-[25%]  text-[12px] px-2"
                    style={{ backgroundColor: "#DBDFFD" }}
                    onClick={() => {
                      setEditphone(true);
                    }}
                  >
                    edit
                  </button>
                  {editphone && (
                    <div className="flex flex-col w-full h-full ml-auto items-center justify-center editInputs absolute z-10">
                      <label className=" mr-auto mb-2">Phone Number:</label>
                      <input
                        className="text-black w-1/2 mb-3 mr-auto px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                        onChange={(e) => {
                          setPhone(e.target.value);
                          onchange({
                            userEmail,
                            userProfile,
                            name,
                            phone: e.target.value,
                            bio,
                            skills,
                            certificates,
                            experience,
                            education,
                          });
                        }}
                      />
                      <button
                        className="border border-black rounded-lg px-2 "
                        onClick={() => {
                          setEditphone(false);
                        }}
                        style={{ backgroundColor: "#1D267D" }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 border border-gay-400 rounded-lg w-full py-4 px-4 shadow-md">
                <div className="flex mb-3">
                  <p className="mb-1" style={{ fontWeight: "600" }}>
                    About{" "}
                    {data && (
                      <span style={{ color: "#1D267D" }}>{data.name}</span>
                    )}
                  </p>
                  <button
                    className="ml-auto rounded-full h-[18%] lg:w-[15%] md:w-[15%] sm:w-[25%]  text-[12px] px-2"
                    style={{ backgroundColor: "#DBDFFD" }}
                    onClick={() => {
                      setEditbio(true);
                    }}
                  >
                    edit
                  </button>
                  {editbio && (
                    <div className="flex flex-col w-full h-full ml-auto  items-center justify-center editInputs absolute z-10">
                      <label className=" mr-auto mb-2">Bio:</label>
                      <input
                        className="text-black w-[70%] mb-3 mr-auto px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                        onChange={(e) => {
                          setBio(e.target.value);
                          onchange({
                            userEmail,
                            userProfile,
                            name,
                            phone,
                            bio: e.target.value,
                            skills,
                            certificates,
                            experience,
                            education,
                          });
                        }}
                      />
                      <button
                        className="border border-black rounded-lg px-2 "
                        onClick={() => {
                          setEditbio(false);
                        }}
                        style={{ backgroundColor: "#1D267D" }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
                {bio.length > 0 ? (
                  <p className="text-[15px] text-gray-600">{bio}</p>
                ) : (
                  data && (
                    <p className="text-[15px] text-gray-600">{data.bio}</p>
                  )
                )}
              </div>
              <div className="mb-4 border border-gay-400 rounded-lg w-full py-4 px-4 shadow-md">
                <div className="flex mb-3">
                  <p style={{ fontWeight: "550" }}>Skills</p>
                  <button
                    className="ml-auto rounded-full h-[18%] lg:w-[15%] md:w-[15%] sm:w-[25%]  text-[12px] px-2"
                    style={{ backgroundColor: "#DBDFFD" }}
                    onClick={() => {
                      setEditskills(true);
                    }}
                  >
                    edit
                  </button>
                  {editskills && (
                    <div className="flex flex-col w-full h-full ml-auto items-center justify-center editInputs absolute z-10">
                      <label className=" mr-auto mb-2">Skills:</label>

                      {showSkill &&
                        skills.map((skill, index) => (
                          <div
                            className="flex flex-row mb-1 text-black"
                            key={index}
                          >
                            <input
                              type="text"
                              id={`question-${index}`}
                              className="w-full mb-3 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                              value={skills[index].skill}
                              onChange={(e) => handleSkillChange({ index, e })}
                              required
                            />
                            <button
                              type="button"
                              className=" text-white opacity-60 hover:opacity-100 font-medium py-1 px-2 rounded-md transition-colors"
                              onClick={() => handleDeleteSkill(index)}
                            >
                              delete
                            </button>
                          </div>
                        ))}

                      <button
                        className="border border-black rounded-lg px-2"
                        onClick={handleAddSkillClick}
                        style={{
                          backgroundColor: "#1D267D",
                          marginBottom: "10px",
                        }}
                      >
                        Add Skill
                      </button>
                      <button
                        className="border border-black rounded-lg px-2 "
                        onClick={() => {
                          setEditskills(false);
                        }}
                        style={{ backgroundColor: "#1D267D" }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
                {skills && skills.length > 0
                  ? skills.map((item, index) => (
                      <div
                        key={index}
                        className="text-[14px] mb-4 "
                        style={{ fontWeight: "550" }}
                      >
                        <p>{item.skill}</p>
                      </div>
                    ))
                  : data &&
                    data.skills &&
                    data.skills.length > 0 &&
                    data.skills.map((item, index) => (
                      <div
                        key={index}
                        className="text-[14px] mb-4 "
                        style={{ fontWeight: "550" }}
                      >
                        <p>{item.skill}</p>
                      </div>
                    ))}
              </div>
            </div>
            <div className="flex flex-col lg:w-[45%] sm:[90%] lg:ml-5 sm:p-4 lg:p-0 sm:bg-white sm:rounded-lg ">
              <div className="mb-4 border border-gay-400 flex flex-row rounded-lg w-full py-4 px-4 shadow-md">
                <div className="flex flex-col w-[65%]">
                  <p className="text-[15px] mb-2">Professional Details</p>
                  <p className="text-[13px] text-gray-700">
                    This are the professional details shown to users in the app
                  </p>
                </div>
                <div className="w-[20%] ml-4 justify-end flex items-center">
                  <Image src={star} alt="star" width={40} />
                </div>
              </div>
              <div className="mb-4  py-4 px-4">
                <div className="flex mb-3">
                  <h3>certificates</h3>
                  <button
                    className="ml-auto rounded-full h-[18%] lg:w-[15%] md:w-[15%] sm:w-[25%]  text-[12px] px-2"
                    style={{ backgroundColor: "#DBDFFD" }}
                    onClick={() => {
                      setEditcertificates(true);
                    }}
                  >
                    edit
                  </button>
                  {editcertificates && (
                    <div className="flex flex-col w-full h-full ml-auto items-center justify-center editInputs absolute z-10">
                      <label className=" mr-auto mb-2">Certificates:</label>
                      {certificates.map((cert, index) => (
                        <div
                          className="flex flex-row mb-5 text-black"
                          key={index}
                        >
                          <input
                            type="text"
                            className="w-[50%] mr-5 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                            placeholder="Language"
                            value={cert.language}
                            onChange={(e) =>
                              handleCertificateChange(
                                index,
                                "language",
                                e.target.value
                              )
                            }
                            required
                          />

                          <input
                            type="text"
                            className="w-[50%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                            placeholder="Organization"
                            value={cert.organization}
                            onChange={(e) =>
                              handleCertificateChange(
                                index,
                                "organization",
                                e.target.value
                              )
                            }
                            required
                          />

                          <button
                            type="button"
                            className=" text-white opacity-60 hover:opacity-100 font-medium py-1 px-2 rounded-md transition-colors"
                            onClick={() => handleDeleteCertificate(index)}
                          >
                            delete
                          </button>
                        </div>
                      ))}
                      <button
                        className="border border-black rounded-lg px-2"
                        onClick={handleAddCertificate}
                        style={{
                          backgroundColor: "#1D267D",
                          marginBottom: "10px",
                        }}
                      >
                        Add Certificate
                      </button>
                      <button
                        className="border border-black rounded-lg px-2"
                        onClick={() => setEditcertificates(false)}
                        style={{ backgroundColor: "#1D267D" }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>

                {certificates.length > 0
                  ? certificates.map((item, index) => (
                      <div
                        className="border mb-3 border-gray-300 text-gray-500 rounded-full flex flex-row shadow-md p-3"
                        key={index}
                      >
                        <div className="w-[13%] mr-auto ">
                          <Image
                            width={55}
                            height={55}
                            src={hexagon}
                            alt="hexagon"
                          />
                        </div>
                        <div className=" w-[80%] flex flex-col items-center justify-center ">
                          <p className="text-[18px]">{item.language}</p>
                          <p className="text-[12px]">{item.organization}</p>
                        </div>
                      </div>
                    ))
                  : data &&
                    data.certificates &&
                    data.certificates.length > 0 &&
                    data.certificates.map((item, index) => (
                      <div
                        className="border mb-3 border-gray-300 text-gray-500 rounded-full flex flex-row shadow-md p-3"
                        key={index}
                      >
                        <div className="lg:w-[13%] sm:w-[22%] mr-auto ">
                          <Image
                            width={55}
                            height={55}
                            src={hexagon}
                            alt="hexagon"
                          />
                        </div>
                        <div className=" w-[80%] flex flex-col items-center justify-center ">
                          <p className="text-[18px]">{item.language}</p>
                          <p className="text-[12px]">{item.organization}</p>
                        </div>
                      </div>
                    ))}
              </div>

              <div className="mb-4  py-4 px-4">
                <div className="flex mb-3">
                  <h3>experience</h3>
                  <button
                    className="ml-auto rounded-full h-[18%] lg:w-[15%] md:w-[15%] sm:w-[25%]  text-[12px] px-2"
                    style={{ backgroundColor: "#DBDFFD" }}
                    onClick={() => {
                      setEditexperience(true);
                    }}
                  >
                    edit
                  </button>
                  {editexperience && (
                    <div className="flex flex-col w-full h-full ml-auto items-center justify-center editInputs absolute z-10">
                      <label className="mr-auto mb-2">Experience:</label>
                      {experience.map((exp, index) => (
                        <div className="mb-5 text-black" key={index}>
                          <input
                            className="w-[30%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            value={exp.fromYear}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "fromYear",
                                e.target.value
                              )
                            }
                            placeholder="From Year"
                          />
                          <input
                            className="w-[30%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            value={exp.toYear}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "toYear",
                                e.target.value
                              )
                            }
                            placeholder="To Year"
                          />
                          <input
                            className="w-[30%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            value={exp.organization}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "organization",
                                e.target.value
                              )
                            }
                            placeholder="Organization"
                          />
                          <input
                            className="w-[87%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            value={exp.detail}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "detail",
                                e.target.value
                              )
                            }
                            placeholder="Detail"
                          />
                          <button
                            type="button"
                            className=" text-white opacity-60 hover:opacity-100 font-medium py-1 px-2 rounded-md transition-colors"
                            onClick={() => handleDeleteExperience(index)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <button
                        className="border border-black rounded-lg px-2"
                        onClick={handleAddExperience}
                        style={{
                          backgroundColor: "#1D267D",
                          marginBottom: "10px",
                        }}
                      >
                        Add Experience
                      </button>
                      <button
                        className="border border-black rounded-lg px-2"
                        onClick={() => setEditexperience(false)}
                        style={{ backgroundColor: "#1D267D" }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>

                {experience.length > 0
                  ? experience.map((item, index) => (
                      <div
                        className="flex border border-gray-300 rounded-lg flex-col p-3 shadow-md"
                        key={index}
                      >
                        <div className="flex text-[15px] justify-between mb-2">
                          <h3>
                            ({item.fromYear}-{item.toYear})
                          </h3>
                          <h3>{item.organization}</h3>
                        </div>
                        <div className="text-gray-600 text-[15px]">
                          {item.detail}
                        </div>
                      </div>
                    ))
                  : data &&
                    data.experience &&
                    data.experience.length > 0 &&
                    data.experience.map((item, index) => (
                      <div
                        className="flex border border-gray-300 rounded-lg flex-col p-3 shadow-md"
                        key={index}
                      >
                        <div className="flex text-[13px] justify-between mb-2">
                          <h3>
                            ({item.fromYear}-{item.toYear})
                          </h3>
                          <h3>{item.organization}</h3>
                        </div>
                        <div className="text-gray-600 text-[15px]">
                          {item.detail}
                        </div>
                      </div>
                    ))}
              </div>

              <div className="mb-4  py-4 px-4">
                <div className="flex mb-3">
                  <h3>education</h3>
                  <button
                    className="ml-auto rounded-full h-[18%] lg:w-[15%] md:w-[15%] sm:w-[25%]  text-[12px] px-2"
                    style={{ backgroundColor: "#DBDFFD" }}
                    onClick={() => {
                      setEditeducation(true);
                    }}
                  >
                    edit
                  </button>
                  {editeducation && (
                    <div className="flex flex-col w-full h-full ml-auto items-center justify-center editInputs absolute z-10">
                      <label className=" mr-auto mb-2">Education:</label>

                      {education.map((edu, index) => (
                        <div className="mb-5 text-black" key={index}>
                          <input
                            type="text"
                            className="w-[20%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                            required
                          />
                          <input
                            className="w-[20%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            value={edu.fromYear}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "fromYear",
                                e.target.value
                              )
                            }
                            placeholder="From Year"
                          />
                          <input
                            className="w-[20%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            value={edu.toYear}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "toYear",
                                e.target.value
                              )
                            }
                            placeholder="To Year"
                          />
                          <input
                            className="w-[20%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            value={edu.organization}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "organization",
                                e.target.value
                              )
                            }
                            placeholder="Organization"
                          />
                          <input
                            className="w-[87%] px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 mb-2 mr-5"
                            value={edu.detail}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "detail",
                                e.target.value
                              )
                            }
                            placeholder="Detail"
                          />
                          <button
                            type="button"
                            className=" text-white opacity-60 hover:opacity-100 font-medium py-1 px-2 rounded-md transition-colors"
                            onClick={() => handleDeleteEducation(index)}
                          >
                            delete
                          </button>
                        </div>
                      ))}

                      <button
                        className="border border-black rounded-lg px-2"
                        onClick={handleAddEducation}
                        style={{
                          backgroundColor: "#1D267D",
                          marginBottom: "10px",
                        }}
                      >
                        Add Education
                      </button>
                      <button
                        className="border border-black rounded-lg px-2"
                        onClick={() => setEditeducation(false)}
                        style={{ backgroundColor: "#1D267D" }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>

                {education.length > 0
                  ? education.map((item, index) => (
                      <div
                        className="border border-gray-300 shadow-md rounded-lg p-3 flex flex-col mb-3"
                        key={index}
                      >
                        <h1 className="mb-2" style={{ color: "#1D267D" }}>
                          {item.organization}
                        </h1>
                        <div className="flex mb-2 text-[13px] flex-row justify-between">
                          <h3>
                            ({item.fromYear}-{item.toYear})
                          </h3>
                          <h3>{item.degree}</h3>
                        </div>
                        <div className="text-gray-600 text-[13px]">
                          {item.detail}
                        </div>
                      </div>
                    ))
                  : data &&
                    data.education &&
                    data.education.length > 0 &&
                    data.education.map((item, index) => (
                      <div
                        className="border border-gray-300 shadow-md rounded-lg p-3 flex flex-col mb-3"
                        key={index}
                      >
                        <h1 className="mb-2" style={{ color: "#1D267D" }}>
                          {item.organization}
                        </h1>
                        <div className="flex mb-2 text-[13px] flex-row justify-between">
                          <h3>
                            ({item.fromYear}-{item.toYear})
                          </h3>
                          <h3>{item.degree}</h3>
                        </div>
                        <div className="text-gray-600 text-[13px]">
                          {item.detail}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
