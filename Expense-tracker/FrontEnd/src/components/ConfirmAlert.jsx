const ConfirmAlert = (props) => {
    const { content, onConfirm, confirmContent, color } = props;

    return (
        <div>
            <p className="text-sm">{content}</p>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className={`add-btn ${color}-btn-fill`}
                    onClick={onConfirm}
                >
                    {confirmContent}
                </button>
            </div>
        </div>
    )
};

export default ConfirmAlert;