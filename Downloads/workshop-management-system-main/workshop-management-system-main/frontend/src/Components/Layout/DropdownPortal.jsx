import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const DropdownPortal = ({ children }) => {
  const mount = document.getElementById('dropdown-root');
  return mount ? createPortal(children, mount) : null;
};

DropdownPortal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DropdownPortal;
