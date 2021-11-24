import Base from '../base'

export default function Image({ config, id }) {
  return (
    <Base 
      id={id}
      type="image"
      config={config}>
    </Base>
  )
}
