import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Input from "../../components/Inputs/Input";
import CharAvatar from "../../components/Cards/CharAvatar";
import Textarea from "../../components/Inputs/Textarea";
import SettingButton from "../../components/Profile/SettingButton";
import Modal from "../../components/Modal";
import ConfirmAlert from "../../components/ConfirmAlert";
import { LuPencil, LuTrash2, LuBan } from "react-icons/lu";


const Profile = () => {
    useUserAuth();

    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clearAllTransactions, setClearAllTransactions] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const { clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
            if (response.data) {
                setUserProfile(response.data);
            }
        } catch (error) {
            toast.error("Failed to fetch user profile. Please try again.");
            console.error("Error fetching user profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => { };

    const handleClearAllTransactions = async () => {
        try {
            const income_response = await axiosInstance.delete(API_PATHS.INCOME.DELETE_ALL_INCOME);
            const expense_response = await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_ALL_EXPENSE);
            if (income_response.status === 200 && expense_response.status === 200) {
                setClearAllTransactions(false);
                toast.success("All transactions cleared successfully!");
            }
        } catch (error) {
            console.error("Error clearing all transactions:", error);
            toast.error("Failed to clear transactions. Please try again.");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await axiosInstance.delete(API_PATHS.AUTH.DELETE_ACCOUNT);
            if (response.status === 200) {
                localStorage.removeItem("token");
                clearUser();
                navigate("/login");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete account. Please try again.");
            setDeleteAccount(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
        return () => { };
    }, []);

    return (
        <DashboardLayout activeMenu="Profile">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card flex items-center justify-between flex-col">
                        <div className='flex items-start justify-between w-full mb-4'>
                            <div className="flex flex-col justify-center w-full">
                                <h2 className="text-lg font-medium mb-1">User Profile</h2>
                                <p className="text-gray-600 mb-2">Let’s make it feel like you</p>
                            </div>
                            <div className="flex flex-row gap-1.5">
                                <SettingButton tooltip="Update Your Profile" icon={<LuPencil size={18} />} onClick={handleUpdateProfile} />
                                <SettingButton tooltip="Clear All Transactions" icon={<LuTrash2 size={18} />} onClick={() => setClearAllTransactions(true)} />
                                <SettingButton tooltip="Delete Account" icon={<LuBan size={18} />} onClick={() => setDeleteAccount(true)} />
                            </div>
                        </div>

                        {userProfile?.profileImageUrl ? (
                            <img
                                src={userProfile?.profileImageUrl}
                                alt="Profile"
                                className="w-42 h-42 bg-state-400 rounded-full"
                            />
                        ) : (
                            <CharAvatar
                                fullName={userProfile?.fullName}
                                width="w-42"
                                height="h-42"
                                style="text-6xl"
                            />
                        )}

                        <div className="w-full">
                            <Textarea
                                label="Bio"
                                value={userProfile?.bio || "N/A"}
                                placeholder="Write something about yourself..."
                                allowInput={false}
                                rows={8}
                            />
                        </div>
                    </div>
                    <div className="card">
                        <Input label="Fullname" type="text" placeholder={userProfile?.fullName || 'N/A'} allowInput={false} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Gender" type="text" placeholder={userProfile?.gender || 'N/A'} allowInput={false} />
                            <Input label="Date of Birth" type="date" placeholder={userProfile?.dob || 'N/A'} allowInput={false} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Email" type="email" placeholder={userProfile?.email || 'N/A'} allowInput={false} />
                            <Input label="Phone" type="tel" placeholder={userProfile?.phone || 'N/A'} allowInput={false} />
                        </div>
                        <Input label="Address" type="text" placeholder={userProfile?.address || 'N/A'} allowInput={false} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="City" type="text" placeholder={userProfile?.city || 'N/A'} allowInput={false} />
                            <Input label="State" type="text" placeholder={userProfile?.state || 'N/A'} allowInput={false} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Country" type="text" placeholder={userProfile?.country || 'N/A'} allowInput={false} />
                            <Input label="Zip Code" type="text" placeholder={userProfile?.zip || 'N/A'} allowInput={false} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={clearAllTransactions}
                onClose={() => setClearAllTransactions(false)}
                title="Clear All Transactions Data"
            >
                <ConfirmAlert
                    content="Are you sure you want to delete all transactions data?"
                    onConfirm={() => { handleClearAllTransactions() }}
                    confirmContent="Delete"
                    color="error"
                />
            </Modal>

            <Modal
                isOpen={deleteAccount}
                onClose={() => setDeleteAccount(false)}
                title="Delete Account"
            >
                <ConfirmAlert
                    content="Are you sure you want to delete your account?"
                    onConfirm={() => { handleDeleteAccount() }}
                    confirmContent="Delete"
                    color="error"
                />
            </Modal>
        </DashboardLayout >
    );
}

export default Profile;
