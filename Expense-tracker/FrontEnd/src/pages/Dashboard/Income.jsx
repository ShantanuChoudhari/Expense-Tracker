import { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import ConfirmAlert from "../../components/ConfirmAlert";

const IncomePage = () => {
    useUserAuth();

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    // Get All Income Transactions
    const fetchIncomeTransactions = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);

            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Error fetching income transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Income
    const handleAddIncome = async (income) => {
        const { source, amount, date, icon } = income;
        // Validation Checks
        if (!source.trim()) {
            toast.error("Source is required!");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount must be a valid number greater than 0!");
            return;
        }

        if (!date) {
            toast.error("Date is required!");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source,
                amount: Number(amount),
                date,
                icon,
            });

            setOpenAddIncomeModal(false);
            toast.success("Income added successfully!");
            fetchIncomeTransactions();
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    // Handle Delete Income
    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully!");
            fetchIncomeTransactions();
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    };

    // Handle download income details
    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'income_details.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading income details:", error);
            toast.error("Failed to download income details.");
        }
    };

    useEffect(() => {
        fetchIncomeTransactions();
        return () => { };
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({
                                show: true,
                                data: id
                            });
                        }}
                        onDownload={handleDownloadIncomeDetails}
                    />
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Income"
                >
                    <ConfirmAlert
                        content="Are you sure you want to delete this income transaction?"
                        onConfirm={() => { deleteIncome(openDeleteAlert.data) }}
                        confirmContent="Delete"
                        color="error"
                    />
                </Modal>
            </div>
        </DashboardLayout >
    );
}

export default IncomePage;
