import BackButton from "@components/buttons/BackButton";
import ResponsiveText from "@components/ResponsiveText";
import ScrollSpy from "@components/ScrollSpy";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import {
  Box,
  Container,
  Divider,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { flattenChildren } from "@utils/helperFunctions";
import {
  addChapters,
  createSlug,
  createTitle,
  extractHeadingsFromMd,
  getLevel,
  parseDepths,
} from "@utils/markdown";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import commonProps from "@hoc/commonProps";
import RoundedButton from "@components/buttons/RoundedButton";
import EditIcon from "@mui/icons-material/Edit";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { CommonContext } from "@context/commonContext";

function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flattenChildren, "");
  var slug = createSlug(text);
  return React.createElement("h" + props.level, { id: slug }, props.children);
}

const BasicDocument = ({ data = {}, user }) => {
  const [document, setDocument] = useState(data);
  const [ids, setIds] = useState([]);
  const router = useRouter();
  const { setCommonValues } = useContext(CommonContext);

  const uid = user?._id;

  var {
    _id,
    title,
    username,
    body,
    timestamp,
    contributors,
    views,
    likes,
    author,
  } = document || {};

  const liked = !!likes?.includes?.(uid);

  // Edit Button condition here
  const isLoggedIn = !!user?.authenticated; //&& user?._id === author;

  // Generate all Ids from markdown headings
  useEffect(() => {
    if (body) {
      const headers = extractHeadingsFromMd(body);
      const _ids = headers?.reduce((acc, header) => {
        const title = createTitle(header);
        const slug = createSlug(title);
        const level = getLevel(header);
        return [...acc, { title, slug, level }];
      }, []);

      const _temp2 = parseDepths(_ids || []);
      const _temp3 = addChapters(_temp2 || []);

      setIds(_temp3 || []);
    }
  }, [body]);

  const triggerLike = async () => {
    if (!isLoggedIn) return setCommonValues({ signUpDialogOpen: true });

    const res = await fetch(
      `/api/documents?_id=${_id}&uid=${uid}&like=${!liked}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Something's wrong");
      })
      .then((data) => {
        setDocument((old) => ({ ...old, likes: data.message.value.likes }));
      });
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Stack direction="row" spacing={5}>
        {ids.length > 0 && (
          <Box>
            <BackButton sx={{ mb: { xs: 1, md: 2 } }} />
            <ScrollSpy title="Table of Content" data={ids} />
          </Box>
        )}

        <Container>
          <Stack spacing={3}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="space-between"
            >
              <ResponsiveText variant="h3" sx={{ fontWeight: 600 }}>
                {title}
              </ResponsiveText>

              {isLoggedIn && (
                <RoundedButton
                  icon={<EditIcon fontSize="small" />}
                  href={`/studio/documents/edit/${_id}`}
                >
                  Edit
                </RoundedButton>
              )}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" spacing={1}>
                <Brightness1Icon sx={{ fontSize: 18, mt: 0.1 }} />
                <Stack>
                  <Link href={`/profile/123`} passHref>
                    <Typography sx={{ cursor: "pointer" }}>
                      Author: {username}
                    </Typography>
                  </Link>
                  <Typography>
                    Contributors:{" "}
                    {contributors &&
                      contributors.map(
                        (person, i) =>
                          `${person}${i < contributors.length - 1 ? ", " : ""}`
                      )}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.7}
              >
                <Typography>Posted {moment(timestamp).format("LL")}</Typography>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <VisibilityIcon fontSize="small" />
                <Typography>Views: {views}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Button
                  size="small"
                  onClick={triggerLike}
                  sx={(theme) => ({ color: theme.palette.primary.inverse })}
                >
                  {liked ? (
                    <FavoriteIcon fontSize="small" sx={{ mr: 0.7 }} />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" sx={{ mr: 0.7 }} />
                  )}
                  Likes: {likes?.length || 0}
                </Button>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ minHeight: "50vh" }}>
              <ReactMarkdown
                components={{
                  h1: HeadingRenderer,
                  h2: HeadingRenderer,
                  h3: HeadingRenderer,
                  h4: HeadingRenderer,
                  h5: HeadingRenderer,
                  h6: HeadingRenderer,
                }}
              >
                {body}
              </ReactMarkdown>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
};

export default commonProps(BasicDocument);
