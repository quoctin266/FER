import { Avatar, Button, Card, CardContent, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllComments, postCreateComment } from "../../service/playerService";
import moment from "moment";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

const CommentSection = () => {
  const [rating, setRating] = useState(0);
  const [invalidRate, setInvalidRate] = useState(false);
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  const userId = useSelector((state) => state.auth.id);

  const fetchComments = async () => {
    let res = await getAllComments(id);
    if (res.status === 200) {
      setComments(res.data);
    } else toast.error(res.error);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!rating) {
      setInvalidRate(true);
      return;
    }

    if (!userId) {
      toast.error("You must login to comment");
      return;
    }

    let res = await postCreateComment({
      ...data,
      rating,
      author: userId,
      player: id,
    });
    if (res.status === 201) {
      fetchComments();
      reset();
      setRating(0);
      toast.success(res.message);
    } else toast.error(res.error);
  };

  useEffect(() => {
    fetchComments();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="comment-section">
      <Row className="review-container">
        <Col className=" py-3" xl={6}>
          <div className="rating px-4 py-3">
            <div className="title mb-3">
              <b>Leave A Comment</b>
            </div>

            <div className="create-review px-3 py-3 mt-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="title">
                    <b>Rate This Player</b>
                  </div>

                  <Button
                    variant="contained"
                    className="submit-rate-btn"
                    type="submit"
                  >
                    Rate
                  </Button>
                </div>

                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                    setInvalidRate(false);
                  }}
                />
                {invalidRate && (
                  <div className="mb-3" style={{ color: "red" }}>
                    Please give your rate
                  </div>
                )}

                <Form.Control
                  as="textarea"
                  rows={4}
                  {...register("comment", {
                    required: "Please type something",
                    maxLength: { value: 256, message: "Exceeded Max Length" },
                  })}
                />
                {errors.comment && (
                  <span style={{ color: "red" }}>{errors.comment.message}</span>
                )}
              </form>
            </div>
          </div>
        </Col>

        <Col xl={6} className="p-3">
          <div className="review-list">
            <div className="title">
              <b>Comments</b>
            </div>

            <div>
              {comments?.map((item, index) => {
                return (
                  <Card key={item._id} className="review-item mt-3">
                    <CardContent>
                      <Row className="align-items-center">
                        <Col xs={1} className="me-4">
                          <Avatar>{item.author?.username?.charAt(0)}</Avatar>
                        </Col>
                        <Col xs={10} className="ms-0">
                          <div className="d-flex align-items-center justify-content-between">
                            <b>{item.author?.username}</b>
                            {item.author._id === userId && (
                              <div>
                                <DeleteComment
                                  item={item}
                                  fetchComments={fetchComments}
                                />
                                <EditComment
                                  item={item}
                                  fetchComments={fetchComments}
                                />
                              </div>
                            )}
                          </div>
                          <div className="time">
                            {moment().diff(moment(item.createdAt), "days") >
                              0 &&
                              `${moment().diff(
                                moment(item.createdAt),
                                "days"
                              )} days ago`}

                            {moment().diff(moment(item.createdAt), "hours") >
                              0 &&
                              moment().diff(moment(item.createdAt), "hours") <
                                24 &&
                              `${moment().diff(
                                moment(item.createdAt),
                                "hours"
                              )} hours ago`}

                            {moment().diff(moment(item.createdAt), "minutes") >
                              0 &&
                              moment().diff(moment(item.createdAt), "minutes") <
                                60 &&
                              `${moment().diff(
                                moment(item.createdAt),
                                "minutes"
                              )} minutes ago`}

                            {moment().diff(moment(item.createdAt), "seconds") >
                              0 &&
                              moment().diff(moment(item.createdAt), "seconds") <
                                60 &&
                              `${moment().diff(
                                moment(item.createdAt),
                                "seconds"
                              )} seconds ago`}
                          </div>
                        </Col>
                      </Row>

                      <Rating
                        className="my-2"
                        name="read-only"
                        value={item.rating}
                        readOnly
                      />

                      <div className="feedback">{item.comment}</div>
                    </CardContent>
                  </Card>
                );
              })}

              {comments && comments.length === 0 && (
                <div className="mt-4" style={{ color: "#585858" }}>
                  This player doesn't have any comments yet...
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CommentSection;
