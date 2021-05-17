import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import cookie from "js-cookie";
import NextLink from "next/link";
import React from "react";
import { FaGlobe, FaMoon, FaSun } from "react-icons/fa";
import Sticky from "react-stickynode";

import { colors } from "../theme";
import CreateChatModal from "./CreateChatModal";

const navBtns = [
  {
    label: "Create",
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Register",
    href: "/register",
  },
];

const Logo = () => (
  <Heading as={Link} href="/" m={4} size="lg">
    ConnectU
  </Heading>
);

const MenuToggle = ({ isOpen, onOpen }) => (
  <Box display={{ base: "block", md: "none" }} pr={4}>
    <Button onClick={onOpen}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Button>
  </Box>
);

const NavButtons = ({ onModalOpen, size, onClose }) => {
  const displayBtns =
    cookie.get("email") !== undefined ? navBtns.slice(0, 1) : navBtns.slice(1);
  const btns = displayBtns.map((btn) => (
    <Button key={btn.label} size={size} variant="link" mb={2} onClick={onClose}>
      {btn.label === "Create" ? (
        <Button variant="link" onClick={onModalOpen}>
          {btn.label}
        </Button>
      ) : (
        <Link href={btn.href}>{btn.label}</Link>
      )}
    </Button>
  ));
  return <>{btns}</>;
};

const ColorModeButton = ({ mr }) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue("dark", "light");
  return (
    <Tooltip
      label={`Toggle ${nextMode} mode`}
      aria-label={`Toggle ${nextMode} mode`}
    >
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Toggle ${nextMode} mode`}
        variant="ghost"
        color="current"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        style={{ marginRight: mr }}
      />
    </Tooltip>
  );
};

const LocaleSelect = () => (
  <Menu>
    <MenuButton as={IconButton} icon={<FaGlobe />} size="md" variant="ghost" />
    <MenuList size="sm">
      <NextLink href="/" locale="en">
        <MenuItem>English</MenuItem>
      </NextLink>
      <NextLink href="/" locale="fr">
        <MenuItem>French</MenuItem>
      </NextLink>
    </MenuList>
  </Menu>
);

const MenuLinks = ({ onModalOpen, onClose }) => (
  <Stack
    display={{ base: "none", sm: "none", md: "block" }}
    width={{ sm: "full", md: "auto" }}
    spacing="24px"
    direction={["column", "row", "row", "row"]}
    alignItems="center"
  >
    <NavButtons size="sm" onModalOpen={onModalOpen} onClose={onClose} />
    <LocaleSelect />
    <ColorModeButton mr="12px" />
  </Stack>
);

const NavMenu = ({ isOpen, onModalOpen, onClose }) => (
  <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerBody>
          <Stack
            alignItems="center"
            justifyContent="center"
            direction={["column"]}
            spacing="24px"
            mt="20vh"
          >
            <NavButtons size="lg" onModalOpen={onModalOpen} onClose={onClose} />
            <LocaleSelect />
            <ColorModeButton />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);

export default function Navbar() {
  const primary = useColorModeValue(colors.primary.light, colors.primary.dark);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  return (
    <Sticky enabled innerZ={99}>
      <Stack
        as="header"
        w="100%"
        direction={["row", "row", "row", "row"]}
        alignItems="center"
        justifyContent="center"
        bg={primary}
      >
        <Logo />
        <Spacer />
        <MenuLinks onModalOpen={onModalOpen} onClose={onClose} />
        <NavMenu isOpen={isOpen} onModalOpen={onModalOpen} onClose={onClose} />
        <MenuToggle isOpen={isOpen} onOpen={onOpen} />
      </Stack>
      <CreateChatModal
        isOpen={isModalOpen}
        onOpen={onModalOpen}
        onClose={onModalClose}
      />
    </Sticky>
  );
}
