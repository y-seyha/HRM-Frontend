import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { formatDateForInput } from "../../utils/helper";
import { usePayroll } from "../../hooks/usePayroll";

const PayrollModal = ({ isOpen, onClose, paymentToEdit, onSuccess }) => {
  const { createPayment, updatePayment } = usePayroll();

  const initialForm = paymentToEdit
    ? {
        employee_id: paymentToEdit.employee_id,
        base_salary: paymentToEdit.base_salary,
        bonus: paymentToEdit.bonus,
        deductions: paymentToEdit.deductions,
        payment_date: formatDateForInput(paymentToEdit.payment_date),
        status: paymentToEdit.status, // must be 'Paid', 'Pending', or 'Failed'
      }
    : {
        employee_id: "",
        base_salary: "",
        bonus: 0,
        deductions: 0,
        payment_date: formatDateForInput(new Date()),
        status: "Pending",
      };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (paymentToEdit) {
        await updatePayment(paymentToEdit.id, form);
      } else {
        await createPayment(form);
      }
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      alert(err.message || "Error saving payment");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {paymentToEdit ? "Update Payroll" : "Add Payroll"}
          </h3>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block mb-1 font-medium" htmlFor="employee_id">
              Employee ID
            </label>
            <input
              type="number"
              name="employee_id"
              id="employee_id"
              placeholder="Employee ID"
              value={form.employee_id}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="base_salary">
              Base Salary
            </label>
            <input
              type="number"
              name="base_salary"
              id="base_salary"
              placeholder="Base Salary"
              value={form.base_salary}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="bonus">
              Bonus
            </label>
            <input
              type="number"
              name="bonus"
              id="bonus"
              placeholder="Bonus"
              value={form.bonus}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="deductions">
              Deductions
            </label>
            <input
              type="number"
              name="deductions"
              id="deductions"
              placeholder="Deductions"
              value={form.deductions}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="payment_date">
              Payment Date
            </label>
            <input
              type="date"
              name="payment_date"
              value={form.payment_date}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="status">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {paymentToEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollModal;
