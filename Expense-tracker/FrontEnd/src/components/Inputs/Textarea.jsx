const Textarea = (props) => {
    const { value, onChange, label, placeholder, allowInput = true, rows = 8 } = props;

    return (
        <div>
            <label className="text-[13px] text-slate-800">{label}</label>

            <div className="input-box">
                <textarea
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none resize-none"
                    value={value}
                    onChange={(e) => onChange(e)}
                    disabled={!allowInput}
                    rows={rows}
                />
            </div>
        </div>
    );
};

export default Textarea;
