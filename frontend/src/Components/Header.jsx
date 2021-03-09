import React, { useState, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useSnackbar } from 'notistack';
import { Link, useHistory } from 'react-router-dom';
import { CartContext } from './CartProvider';
import { AuthContext } from './AuthProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2196F3',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authIcon: {
    textDecoration: 'none',
    color: '#000',
  },
  cartIcon: {
    textDecoration: 'none',
    color: '#fff',
  },
  mobileCartIcon: {
    textDecoration: 'none',
    color: '#000',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { accessToken, setaccessToken } = useContext(AuthContext);
  const {
    cartCount,
    // setcartCount,
    // setcartContent
  } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchInput, setsearchInput] = useState('');
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchInput)
      history.push(`/shop?name=${searchInput}`);
  };

  const logout = () => {
    handleMenuClose();
    setaccessToken('');
    // setcartCount(0);
    // setcartContent();
    enqueueSnackbar('Deslogado com sucesso');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/shop/auth" className={classes.authIcon}>
        <MenuItem onClick={accessToken ? logout : handleMenuClose}>
          {accessToken ? 'Logout' : 'Login'}
        </MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link
        to={accessToken ? '/shop/cart' : '/shop/auth'}
        className={classes.mobileCartIcon}
        onClick={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="mostrar carrinho de compras" color="inherit">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartRoundedIcon />
            </Badge>
          </IconButton>
          <p>Carrinho de compras</p>
        </MenuItem>
      </Link>
      {accessToken ? (
        <MenuItem onClick={logout}>
          <IconButton aria-label="deslogar da conta" color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Log out</p>
        </MenuItem>
      ) : (
        <Link
          to="/shop/auth"
          onClick={handleMobileMenuClose}
          className={classes.authIcon}
        >
          <MenuItem>
            <IconButton aria-label="fazer login" color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Log in</p>
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Link to="/shop" className={classes.logo}>
            <svg
              width="68"
              height="44"
              viewBox="0 0 68 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '10px' }}
            >
              <path
                d="M66.8978 15.087L65.0482 12.5975C64.9305 12.4332 62.0047 8.41473 60.9286 7.07523C59.533 5.31871 59.1967 5.02806 57.3639 3.4611L57.1285 3.25891C56.4055 2.6397 54.1523 0.971646 54.0682 0.908461L53.6142 0.554631C52.9753 0.061795 52.0337 -0.11512 51.1593 0.0744318C50.2849 0.263984 49.6292 0.807367 49.4442 1.47712L49.1584 2.52597C49.1079 2.62707 49.0743 2.72816 49.007 2.82926L48.9566 2.93035C48.923 3.00617 48.8725 3.09463 48.8221 3.17045V3.18309L48.7716 3.27155C48.7044 3.37264 48.6539 3.47373 48.5867 3.57483L48.5362 3.66329C48.4858 3.73911 48.4353 3.81493 48.3849 3.87811C48.3513 3.91602 48.3344 3.95393 48.3008 3.99184C48.2504 4.05503 48.1999 4.13085 48.1495 4.19403L48.0654 4.29513C47.9981 4.38358 47.9141 4.45941 47.8468 4.54786C47.8132 4.58577 47.7796 4.62368 47.7291 4.67423C47.6787 4.72478 47.6282 4.77533 47.5778 4.82587C47.5441 4.86378 47.4937 4.90169 47.4601 4.95224C47.4264 4.99015 47.376 5.02806 47.3424 5.06597L47.2079 5.1797C47.1742 5.21761 47.1238 5.24289 47.0902 5.2808L46.9388 5.40717C46.8716 5.45771 46.8211 5.50826 46.7539 5.55881L46.653 5.63463C46.4176 5.79891 46.1822 5.96319 45.9468 6.11483L45.8291 6.19065L45.6273 6.30438C45.5768 6.32965 45.5432 6.35493 45.4928 6.3802L45.4759 6.39284C45.4087 6.43075 45.3414 6.46866 45.291 6.49393C45.291 6.49393 45.2742 6.50657 45.2574 6.50657C45.0892 6.59503 44.9042 6.68349 44.7193 6.77194L44.6352 6.80985C44.5511 6.84776 44.4671 6.88567 44.3662 6.92358L44.2989 6.94886C43.9963 7.07523 43.6936 7.17632 43.3909 7.27742L43.3573 7.29005C42.9201 7.42906 42.4829 7.54279 42.0121 7.63125H41.9953C41.5245 7.7197 41.0537 7.79552 40.5661 7.83344C39.2377 7.94717 37.9262 7.88398 36.6314 7.61861L36.0934 6.26647C35.3535 4.44677 33.2685 3.09463 30.7799 2.80398C29.6029 2.66498 28.4427 3.14518 27.9551 3.96657L25.0462 8.9202C25.0462 8.93284 25.0462 8.93284 25.0293 8.94547C24.9284 9.14766 24.8276 9.32458 24.7939 9.37513C24.7435 9.43831 24.6762 9.52677 24.3568 10.0954C24.3399 10.1081 24.3399 10.1333 24.3231 10.146L24.1886 10.4619C24.0373 10.7525 23.9028 11.0432 23.7514 11.3465C23.5665 11.7508 23.3815 12.1805 23.0957 12.6354C23.0957 12.6481 23.0788 12.6607 23.0788 12.6733L22.9948 12.825C22.9275 12.9513 22.8602 13.0651 22.793 13.1914L22.6417 13.4568C22.5912 13.5579 22.524 13.659 22.4735 13.7475L22.2885 14.0634C22.2381 14.1518 22.1877 14.2403 22.1372 14.3161L22.0868 14.3919C22.0363 14.4678 21.9859 14.5436 21.9354 14.632C21.8682 14.7331 21.8177 14.8216 21.7505 14.9227L21.1452 15.8452L20.0522 17.3742C19.7327 17.8292 19.3964 18.2335 19.0097 18.6885C18.8584 18.8654 18.707 19.0549 18.5557 19.2318C18.4884 19.3203 18.4044 19.3961 18.3371 19.4846L18.2194 19.6109C18.1185 19.7247 18.0176 19.8384 17.9336 19.9395L17.799 20.0911C17.6981 20.2049 17.5973 20.3186 17.4964 20.4197L17.3787 20.5461C17.0256 20.9252 16.6725 21.3043 16.3025 21.6707L16.2185 21.7592C16.1008 21.8729 15.9831 21.9867 15.8654 22.1004L15.7476 22.2141C15.6299 22.3279 15.5122 22.4416 15.3777 22.568L15.3273 22.6059C14.9237 22.985 14.5034 23.3641 14.083 23.7305L13.9989 23.8064C13.8644 23.9201 13.7467 24.0338 13.6122 24.1476L13.5113 24.236L13.1077 24.5772C11.7458 25.7019 10.2997 26.776 8.78638 27.7743L2.68266 31.8181C-0.0749378 33.6378 -0.764339 36.5822 0.883497 39.4887C1.38794 40.3985 2.06052 41.182 2.93488 41.9023C4.46502 43.1786 6.60048 43.8989 9.15631 43.9874C9.34127 43.9874 9.50941 44 9.69437 44C11.7962 44 13.9821 43.5703 15.899 42.7616L49.9318 28.5199L55.1444 26.3843C55.5816 26.22 62.341 23.6674 64.3252 22.3531L64.4597 22.2647C66.4943 20.9252 66.9146 20.6472 67.6377 19.2698C68.1589 18.2714 68.2766 16.6034 66.8978 15.087ZM46.8379 7.13841C46.8716 7.11314 46.9052 7.1005 46.9388 7.07523L46.9725 7.04995C47.2583 6.87304 47.5273 6.69612 47.8132 6.4813L47.9141 6.40548C47.9813 6.35493 48.0654 6.29174 48.1327 6.22856C48.1663 6.20329 48.1999 6.16538 48.2336 6.1401L48.284 6.10219C48.3344 6.06428 48.3849 6.01373 48.4353 5.97582L48.4521 5.96319C48.4858 5.93791 48.5026 5.91264 48.5362 5.88737L48.6035 5.83682C48.6539 5.79891 48.7044 5.74836 48.7548 5.71045C48.8053 5.6599 48.8557 5.62199 48.9061 5.55881C48.9566 5.50826 49.007 5.44508 49.0743 5.38189C49.1079 5.34398 49.1584 5.29344 49.192 5.25553C49.2761 5.15443 49.3601 5.06597 49.4442 4.96488L49.5283 4.85115C49.5955 4.77533 49.646 4.69951 49.7132 4.61105C49.7469 4.57314 49.7805 4.52259 49.8141 4.48468C49.8814 4.39622 49.9318 4.3204 49.9991 4.23194L50.0159 4.20667L50.0663 4.13085C50.1504 4.01712 50.2177 3.90339 50.2849 3.77702L50.3354 3.67592V3.66329C50.3858 3.57483 50.4363 3.47373 50.4867 3.38528L50.554 3.27155C50.6212 3.15781 50.6717 3.03145 50.7221 2.90508C50.7221 2.89244 50.7221 2.89244 50.7389 2.8798C50.7389 2.85453 50.7557 2.84189 50.7557 2.81662L51.0584 1.72985C51.1425 1.41393 51.4788 1.3002 51.6133 1.27493C51.7478 1.24966 52.1009 1.19911 52.4036 1.42657L52.8744 1.7804C52.8912 1.79304 55.178 3.48637 55.8674 4.06766L56.1028 4.26985C57.9356 5.83682 58.171 6.03901 59.4826 7.69443C60.5419 9.0213 63.5349 13.1409 63.5685 13.1914L65.1491 15.3018C63.9721 15.7946 61.1472 16.9699 57.3471 18.5621C53.093 17.5132 49.9823 15.2892 48.1158 11.9783C46.8716 9.75423 46.6025 7.75761 46.5689 7.29005C46.5857 7.27742 46.6025 7.27742 46.6193 7.26478C46.6866 7.22687 46.7707 7.18896 46.8379 7.13841ZM29.4684 4.45941C29.6534 4.15612 30.0737 3.97921 30.5109 4.02975C32.3773 4.24458 33.9411 5.26816 34.496 6.6203L34.6978 7.1005C32.9154 6.70876 30.2587 6.30438 28.14 6.73403L29.4684 4.45941ZM3.79243 32.7153L9.89615 28.6842C11.4431 27.6606 12.9396 26.5486 14.3352 25.386C14.4025 25.3228 14.4697 25.2722 14.5538 25.2091C15.6804 25.386 16.7229 25.4618 17.6645 25.4618C23.7851 25.4618 26.4418 22.2394 27.5515 20.8999L27.6692 20.7609C28.1064 20.2302 29.1153 18.5495 30.7463 15.6303C30.9313 15.3144 30.7295 14.948 30.2923 14.809C29.872 14.67 29.3843 14.8216 29.1994 15.1502C27.2489 18.6632 26.509 19.7752 26.2568 20.1038L26.1391 20.2428C24.9789 21.6455 22.3726 24.8173 15.8149 24.1097C16.1008 23.8569 16.3698 23.6042 16.6388 23.3641L16.6893 23.3262C16.807 23.2124 16.9415 23.0861 17.0592 22.9723L17.1769 22.8586C17.2946 22.7449 17.4123 22.6185 17.53 22.5048L17.6309 22.4163C18.0008 22.0372 18.3875 21.6455 18.7407 21.2537L18.8584 21.1274L19.161 20.7862L19.2955 20.6345L19.5982 20.2933L19.7159 20.167C19.8 20.0785 19.8672 19.9901 19.9513 19.889C20.1195 19.6994 20.254 19.5099 20.4053 19.3329C20.8089 18.8527 21.162 18.4357 21.4983 17.9555L22.2885 16.8814L23.2638 15.4408C23.3311 15.3397 23.3815 15.2386 23.4488 15.1502C23.4992 15.0743 23.5496 14.9859 23.6001 14.9101L23.6505 14.8342C23.701 14.7458 23.7514 14.6573 23.8187 14.5689L24.0036 14.2529C24.0709 14.1518 24.1213 14.0507 24.1718 13.9497L24.3231 13.6716L24.5249 13.2925L24.609 13.1283C24.9116 12.6228 25.1302 12.1552 25.3152 11.7382C25.4497 11.4476 25.5674 11.1696 25.7187 10.9042C25.7187 10.8915 25.7356 10.8789 25.7356 10.8663L25.8701 10.5504C26.1391 10.0954 26.2064 9.99433 26.2232 9.96906C26.2904 9.89324 26.2904 9.89324 26.5427 9.4004L26.7949 8.97075C27.7197 7.4796 30.7127 7.66916 33.0331 8.07353C32.6968 8.69274 31.9906 10.0449 31.1331 11.6118C30.9649 11.9278 31.1667 12.2942 31.5871 12.4206C31.6879 12.4459 31.7888 12.4711 31.9065 12.4711C32.2428 12.4711 32.5455 12.3195 32.68 12.0794C33.6048 10.3861 34.3615 8.94547 34.6641 8.40209C34.9836 8.47791 35.2695 8.55373 35.488 8.61692C35.5217 8.62955 35.5553 8.65483 35.5889 8.66746C35.6226 8.6801 35.673 8.69274 35.7066 8.70538C37.3545 9.09712 39.0528 9.22348 40.751 9.07184C41.3059 9.0213 41.844 8.94547 42.3989 8.83174H42.4157C42.9538 8.73065 43.475 8.59164 43.9794 8.42737L44.0299 8.41473C44.3494 8.31363 44.6857 8.18727 44.9883 8.0609C45.1397 8.99602 45.5432 10.6388 46.5521 12.4459C48.3849 15.7188 51.4452 18.0945 55.447 19.3835C46.9556 22.9471 34.7818 28.065 25.1134 32.2225C10.5183 38.4777 2.69948 39.2738 2.61541 39.2738H2.59859C2.53133 39.1727 2.46407 39.0716 2.41363 38.9579C1.06846 36.5695 1.58971 34.1686 3.79243 32.7153ZM66.1075 18.7769C65.519 19.8763 65.3677 19.9774 63.3667 21.2916L63.2322 21.3801C61.3826 22.6059 54.455 25.2091 54.3877 25.2343C54.3709 25.2343 54.3709 25.247 54.3541 25.247L49.1247 27.3952L15.0751 41.6243C10.6192 43.4945 6.21374 42.7363 4.16235 41.0303C3.92695 40.8408 3.70836 40.6386 3.50658 40.4238C5.75975 40.1079 13.3095 38.7052 25.9205 33.284C40.9864 26.8139 62.1393 17.9808 65.9394 16.4012C66.4606 17.2731 66.4102 18.183 66.1075 18.7769Z"
                fill="white"
              />
            </svg>

            <Typography className={classes.title} variant="h6" noWrap>
              Kool Shoes
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Pesquisar produto..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
              onKeyPress={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link
              to={accessToken ? '/shop/cart' : '/shop/auth'}
              className={classes.cartIcon}
            >
              <IconButton
                aria-label="mostrar carrinho de compras"
                color="inherit"
              >
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCartRoundedIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="mostrar mais"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
