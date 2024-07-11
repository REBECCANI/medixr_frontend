interface PageProps {
    styles: String,
    label: String
}

const Button = ({ styles, label }: PageProps) => (
  <button type="button" className={`z-20 ${styles}`}>
    {label}
  </button>
)

export default Button