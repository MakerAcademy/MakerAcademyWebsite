import commonProps from "@hoc/commonProps";
import useDebounce from "@hooks/useDebounce";
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
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Popper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const SearchFilterBar = ({
  tags,
  parentCallback,
  withSort,
  sortItems = [],
  translateChips,
  translateCategories,
  translateSubCategories,
  dontTranslateSubCategoriesOf = [],
  theme,
  t,
  inputPlaceholder = "Search Content",
}) => {
  const [sortBy, setSortBy] = useState(sortItems[0]);
  const [filters, setFilters] = useState(tags);
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
    const target = event.currentTarget;
    setAnchorEl(anchorEl ? null : target);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setCollapsedFilterIdx(null);
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

  const triggerSearch = () => {
    parentCallback?.(searchTerm, selectedFilters);
  };

  const FilterMenuList = () => (
    <Popper
      open={filterOpen}
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
          placeholder={t("search")}
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
                        <Typography>
                          {translateCategories
                            ? t(`filter_${item.category}`)
                            : item.category}
                        </Typography>

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

                <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subCategories?.map((subItem, j) => {
                      const isSelected2 = selectedFilters?.some(
                        (o) => o.value === subItem.value
                      );

                      return (
                        <ListItemButton
                          sx={{ pl: 4 }}
                          key={`${i}${j}`}
                          onClick={() =>
                            handleFilterItemClick({
                              ...subItem,
                              dontTranslate:
                                dontTranslateSubCategoriesOf.includes(
                                  item.category
                                ),
                            })
                          }
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
                          <ListItemText
                            primary={
                              translateSubCategories &&
                              !dontTranslateSubCategoriesOf.includes(
                                item.category
                              )
                                ? t(`filter_${subItem.label}`)
                                : subItem.label
                            }
                          />
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
                    label={
                      translateChips && !item.dontTranslate
                        ? t(`filter_${item.label}`)
                        : item.label
                    }
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
  );

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
          <ClickAwayListener onClickAway={handleFilterClose}>
            <Box sx={{ height: "100%" }}>
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
                  {t("filter")}
                </Badge>

                {!filterOpen ? (
                  <ArrowDropDownIcon fontSize="small" sx={{ ml: 0.5 }} />
                ) : (
                  <ArrowDropUpIcon fontSize="small" sx={{ ml: 0.5 }} />
                )}
              </Button>

              {<FilterMenuList />}
            </Box>
          </ClickAwayListener>
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
          <IconButton
            sx={{ p: "10px", color: theme.palette.primary.white }}
            onClick={triggerSearch}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Paper>

      {withSort && (
        <Stack alignItems="flex-end" sx={{ width: "100%" }}>
          <FormControl
            sx={{ [theme.breakpoints.up("md")]: { maxWidth: 230 } }}
            fullWidth
            size="small"
          >
            <InputLabel id="sort-label">{t("sort_by")}</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortItems.map((name) => (
                <MenuItem value={name} key={name}>
                  {t(`sort_${name}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      )}
    </React.Fragment>
  );
};

export default commonProps(SearchFilterBar, {
  basic: true,
  translations: "common",
});
