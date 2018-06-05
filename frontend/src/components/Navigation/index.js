import { connect } from "react-redux";
import Container from "./container";

// const mapStateToProps = (state, ownProps) => {
//   const {
//     user: { is_superuser, is_staff, id, name }
//   } = state;
//   return {
//     is_superuser,
//     is_staff,
//     id,
//     name
//   };
// };

export default connect()(Container);
