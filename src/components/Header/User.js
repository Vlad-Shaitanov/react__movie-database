import React, { Component } from "react";
import AppContextHOC from "../HOC/AppContextHOC";

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          width="40"
          className="rounded-circle"
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
          alt="#"
        />
      </div>
    );
  }
}
export default AppContextHOC(User);

// const UserContainer = (props) => {
//   return (
//     <AppContext.Consumer>
//       {(context) => {
//         // console.log(context);
//         return <User user={context.user} {...props} />;
//       }}
//     </AppContext.Consumer>
//   );
// };
//
// /*Подпишем обертку, чтобы она не отображалась в девтулз как анонимная,
// а имела имя. Такой подход упрощает обработку ошибок*/
// UserContainer.displayName = "UserContainer";
