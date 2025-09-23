import { useContext, useState } from "react";
import "./update.scss";
import { AuthContext } from "../../contexts/authContext";
import ImageIcon from "@mui/icons-material/Image";
import { request } from "../../axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const UpdateProfile = ({ setUpdateBox }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [input, setInput] = useState({
    name: currentUser.name,
    email: currentUser.email,
    city: currentUser.city,
    webSite: currentUser.webSite,
  });
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await request.post("/upload", formData);
    return res.data;
  };
  const handleCancel = () => {
    setUpdateBox(false);
  };
  const mutation = useMutation({
    mutationFn: async (body) => {
      const res = await request.put("/user", body);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Profile Updated");
      setCurrentUser(data);
      setUpdateBox(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    let profilePicUrl, coverPicUrl;

    const no_inpChange =
      input.city === currentUser.city &&
      input.email === currentUser.email &&
      input.name === currentUser.name &&
      input.webSite === currentUser.webSite;

    const no_picChange = !profilePic && !coverPic;

    if (no_inpChange && no_picChange) {
      toast.error("Nothing to update");
      return;
    }

    try {
      if (profilePic) profilePicUrl = await upload(profilePic);
      if (coverPic) coverPicUrl = await upload(coverPic);
    } catch (err) {
      toast.error("Upload failed. Try again");
      console.log(err);
      return;
    }

    mutation.mutate({
      ...input,
      coverPic: coverPicUrl,
      profilePic: profilePicUrl,
    });
  };
  return (
    <div className="backgroundBlur">
      <div className="updateProfile">
        <h1>Update Profile</h1>
        <div className="card">
          <div className="left">
            <input
              name="name"
              type="text"
              placeholder={currentUser.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="text"
              placeholder={currentUser.email}
              onChange={handleChange}
            />
            <input
              name="city"
              type="text"
              placeholder={currentUser.city || "city"}
              onChange={handleChange}
            />
            <input
              name="webSite"
              type="text"
              placeholder={currentUser.webSite || "website"}
              onChange={handleChange}
            />
            <div className="actions">
              <button onClick={handleUpdate} disabled={mutation.isPending}>
                {mutation.isPending ? <div className="spinner" /> : "Update"}
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
          <div className="right">
            <input
              id="profilePic"
              type="file"
              onChange={(e) => {
                setProfilePic(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
            <input
              id="coverPic"
              type="file"
              onChange={(e) => {
                setCoverPic(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
            <label htmlFor="profilePic">
              <div className="item">
                <ImageIcon />
                <span>Add Profile Pic</span>
              </div>
            </label>
            {profilePic ? (
              <img src={URL.createObjectURL(profilePic)} />
            ) : (
              <img src={currentUser.profilePic} />
            )}
            <label htmlFor="coverPic">
              <div className="item">
                <ImageIcon />
                <span>Add Cover Pic</span>
              </div>
            </label>
            {coverPic ? (
              <img src={URL.createObjectURL(coverPic)} />
            ) : (
              <img src={currentUser.coverPic} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
