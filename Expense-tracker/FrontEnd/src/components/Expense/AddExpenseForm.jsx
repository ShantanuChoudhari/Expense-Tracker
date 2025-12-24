import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = (props) => {
    const { onAddExpense } = props;
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={expense.category}
                onChange={(e) => handleChange("category", e.target.value)}
                label="Expense Category"
                placeholder="Food, Transport, etc."
                type="text"
            />
            <Input
                value={expense.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                label="Amount"
                placeholder="Enter amount"
                type="number"
            />
            <Input
                value={expense.date}
                onChange={(e) => handleChange("date", e.target.value)}
                label="Date"
                placeholder="YYYY-MM-DD"
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn primary-btn-fill"
                    onClick={() => {
                        onAddExpense(expense);
                        setExpense({ category: "", amount: "", date: "", icon: "" });
                    }}
                >
                    Add Expense
                </button>
            </div>
        </div>
    )
};

export default AddExpenseForm;