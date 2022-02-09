import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  ClickAwayListener,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useDebounce from "@hooks/useDebounce";
import { DUMMY_FILTER_OPTIONS } from "./dummyData";

const SearchFilterBar = (props) => {
  const { inputPlaceholder = "Search Content" } = props;

  const theme = useTheme();
  const [filters, setFilters] = useState(DUMMY_FILTER_OPTIONS);
  const [filteredFilters, setFilteredFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterSearchTerm, setFilterSearchTerm] = useState("");
  const _filterSearchTerm = useDebounce(filterSearchTerm, 500);
  const [collapsedFilterIdx, setCollapsedFilterIdx] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const filterOpen = Boolean(anchorEl);

  // Filter Search term inside filter menu
  useEffect(() => {
    if (_filterSearchTerm) {
      const filtered = filters.reduce((acc, item) => {
        return [
          ...acc,
          {
            ...item,
            subCategories: item.subCategories.filter((subItem) =>
              subItem.value
                .toLowerCase()
                ?.includes(_filterSearchTerm.toLowerCase())
            ),
          },
        ];
      }, []);

      setFilteredFilters(filtered);
    } else {
      setFilteredFilters(filters);
    }
  }, [_filterSearchTerm]);

  const handleFilterOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setCollapsedFilterIdx(null);
    setAnchorEl(null);
  };

  const handleFilterItemClick = (item) => {
    const isSelected = selectedFilters?.some((o) => o.value === item.value);

    if (isSelected) {
      setSelectedFilters((old) => [
        ...old.filter((_item) => item.value !== _item.value),
      ]);
    } else {
      setSelectedFilters((old) => [...old, item]);
    }
  };

  return (
    <React.Fragment>
      <Paper
        elevation={0}
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: `1px solid ${theme.palette.primary.main}80`,
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.grey1,
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <Button
            sx={{
              py: "10px",
              px: { xs: 2, md: 3, lg: 4 },
              textTransform: "inherit",
              height: "100%",
              color: theme.palette.primary.black,
            }}
            onClick={handleFilterOpen}
          >
            <Badge
              badgeContent={selectedFilters?.length}
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                "& .MuiBadge-badge": {
                  left: -8,
                  top: 5,
                  border: `1px solid ${theme.palette.background.paper}`,
                  padding: "0 4px",
                  color: theme.palette.primary.white,
                },
              }}
            >
              Filter
            </Badge>

            {!filterOpen ? (
              <ArrowDropDownIcon fontSize="small" sx={{ ml: 0.5 }} />
            ) : (
              <ArrowDropUpIcon fontSize="small" sx={{ ml: 0.5 }} />
            )}
          </Button>
        </Box>

        <InputBase
          sx={{ ml: { xs: 1, md: 2 }, flex: 1 }}
          placeholder={inputPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <IconButton sx={{ p: "10px", color: theme.palette.primary.white }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Paper>

      {filterOpen && (
        <ClickAwayListener
          onClickAway={() => filterOpen && handleFilterClose()}
        >
          <Popper
            open
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ zIndex: 10000 }}
          >
            <Paper
              sx={{
                [theme.breakpoints.down("sm")]: { width: "100%" },
                [theme.breakpoints.up("sm")]: { width: 300 },
              }}
            >
              {/* Search */}
              <TextField
                variant="standard"
                value={filterSearchTerm}
                onChange={(e) => setFilterSearchTerm(e.target.value)}
                placeholder="Search"
                fullWidth
                size="small"
                sx={{ mt: 2, px: 2 }}
              />

              {/* Items */}
              <List
                sx={{
                  maxHeight: 400,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {filteredFilters.map((item, i) => {
                  const isSelected = selectedFilters?.some((o) =>
                    item.subCategories?.some((p) => o.value === p.value)
                  );
                  const isCollapseOpen = collapsedFilterIdx === i;

                  return (
                    <React.Fragment key={i}>
                      <ListItemButton
                        selected={isSelected}
                        onClick={() =>
                          isCollapseOpen
                            ? setCollapsedFilterIdx(null)
                            : setCollapsedFilterIdx(i)
                        }
                      >
                        <ListItemText
                          primary={
                            <Stack direction="row" alignItems="center">
                              <Typography>{item.category}</Typography>

                              {_filterSearchTerm.length > 0 && (
                                <Typography
                                  variant="body2"
                                  sx={{ ml: 1, fontWeight: 300 }}
                                >
                                  ({item.subCategories.length})
                                </Typography>
                              )}
                            </Stack>
                          }
                        />
                        {!isCollapseOpen ? (
                          <ChevronRightIcon fontSize="small" />
                        ) : (
                          <KeyboardArrowUpIcon fontSize="small" />
                        )}
                      </ListItemButton>

                      <Collapse
                        in={isCollapseOpen}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.subCategories?.map((item2, j) => {
                            const isSelected2 = selectedFilters?.some(
                              (o) => o.value === item2.value
                            );

                            return (
                              <ListItemButton
                                sx={{ pl: 4 }}
                                key={`${i}${j}`}
                                onClick={() => handleFilterItemClick(item2)}
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={isSelected2}
                                    tabIndex={-1}
                                    disableRipple
                                    sx={{ py: 0 }}
                                    size="small"
                                  />
                                </ListItemIcon>
                                <ListItemText primary={item2.label} />
                              </ListItemButton>
                            );
                          })}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  );
                })}
              </List>

              {selectedFilters.length > 0 && (
                <>
                  <Divider />

                  {/* Chips */}
                  <Paper
                    sx={{
                      p: 1,
                      [theme.breakpoints.down("sm")]: { width: "100%" },
                      [theme.breakpoints.up("sm")]: { width: 300 },
                    }}
                  >
                    <Stack direction="row" flexWrap="wrap">
                      {selectedFilters.map((item, i) => (
                        <Chip
                          key={i}
                          label={item.label}
                          onDelete={() => handleFilterItemClick(item)}
                          sx={{ mb: 0.5, mr: 0.5 }}
                        />
                      ))}
                    </Stack>
                  </Paper>
                </>
              )}
            </Paper>
          </Popper>
        </ClickAwayListener>
      )}
    </React.Fragment>
  );
};

export default SearchFilterBar;
