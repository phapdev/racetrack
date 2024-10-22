import { NotFoundContainer, Content } from "./NotFound.styled";

const NotFound = () => {
  return (
    <NotFoundContainer id="app">
      <Content>
        <div>404</div>
        <div className="txt">
          Page Not Found<span className="blink">_</span>
        </div>
      </Content>
    </NotFoundContainer>
  )
}

export default NotFound;
