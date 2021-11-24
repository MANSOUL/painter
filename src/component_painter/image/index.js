import Base, { VIEW_TYPE_IMAGE } from '../base'

export default function Image({ config, id }) {
  return (
    <Base 
      id={id}
      type={VIEW_TYPE_IMAGE}
      config={config}>
    </Base>
  )
}
