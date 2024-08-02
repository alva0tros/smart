import { FC, Fragment } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import { imagesData } from "../../common/commonimages";
import Pageheader from "../../layout/layoutcomponent/pageheader";
import { Link } from "react-router-dom";

interface ComponentProps {}

const Dashboard: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <Pageheader title="DASHBOARD" heading="Dashboard" active="Sales" />
            <Row>
                <Col xxl={5} xl={12} lg={12} md={12} sm={12}>
                    <Row>
                        <Col xl={12} lg={12} md={12} xs={12}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col xl={9} lg={7} md={6} sm={12}>
                                            <div className="text-justified align-items-center">
                                                <h3 className="text-dark fw-semibold mb-2 mt-0">
                                                    Hi, Welcome Back <span className="text-primary">Nick!</span>
                                                </h3>
                                                <p className="text-dark fs-14 mb-3 lh-3">
                                                    You have used the 85% of free plan storage. Please upgrade your plan
                                                    to get unlimited storage.
                                                </p>
                                                <Button variant="" className="btn btn-primary shadow">
                                                    Upgrade Now
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col
                                            xl={3}
                                            lg={5}
                                            md={6}
                                            sm={12}
                                            className="d-flex align-items-center justify-content-center upgrade-chart-circle p-0"
                                        ></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={12} lg={12} md={12} xs={12}>
                            <Card>
                                <Card.Header className="pb-1">
                                    <h3 className="card-title">Browser Usage</h3>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <div className="browser-stats">
                                        <div className="d-flex align-items-center item  border-bottom my-2">
                                            <div className="d-flex">
                                                <img src={imagesData("svg7")} alt="img" className="ht-30 wd-30 me-2" />
                                                <div className="truncate">
                                                    <h6 className="">Chrome</h6>
                                                    <span className="text-muted fs-12">Google, Inc.</span>
                                                </div>
                                            </div>
                                            <div className="ms-auto my-auto">
                                                <div className="d-flex">
                                                    <span className="me-4 mt-1 fw-semibold fs-16">35,502</span>
                                                    <span className="text-success fs-13 my-auto">
                                                        <i className="fe fe-trending-up text-success mx-2 my-auto"></i>
                                                        12.75%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center item  border-bottom my-2">
                                            <div className="d-flex">
                                                <img src={imagesData("svg8")} alt="img" className="ht-30 wd-30 me-2" />
                                                <div className="truncate">
                                                    <h6 className="">Edge</h6>
                                                    <span className="text-muted fs-12">
                                                        Microsoft Corporation, Inc.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ms-auto my-auto">
                                                <div className="d-flex">
                                                    <span className="me-4 mt-1 fw-semibold fs-16">25,364</span>
                                                    <span className="text-success">
                                                        <i className="fe fe-trending-down text-danger mx-2 my-auto"></i>
                                                        24.37%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center item  border-bottom my-2">
                                            <div className="d-flex">
                                                <img src={imagesData("svg10")} alt="img" className="ht-30 wd-30 me-2" />
                                                <div className="truncate">
                                                    <h6 className="">Firefox</h6>
                                                    <span className="text-muted fs-12">Mozilla Foundation, Inc.</span>
                                                </div>
                                            </div>
                                            <div className="ms-auto my-auto">
                                                <div className="d-flex">
                                                    <span className="me-4 mt-1 fw-semibold fs-16">14,635</span>
                                                    <span className="text-success">
                                                        <i className="fe fe-trending-up text-success mx-2 my-auto"></i>
                                                        15,63%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center item  border-bottom my-2">
                                            <div className="d-flex">
                                                <img src={imagesData("svg28")} alt="img" className="ht-30 wd-30 me-2" />
                                                <div className="truncate">
                                                    <h6 className="">Safari</h6>
                                                    <span className="text-muted fs-12">Apple Corporation, Inc.</span>
                                                </div>
                                            </div>
                                            <div className="ms-auto my-auto">
                                                <div className="d-flex">
                                                    <span className="me-4 mt-1 fw-semibold fs-16">35,657</span>
                                                    <span className="text-danger">
                                                        <i className="fe fe-trending-up text-success mx-2 my-auto"></i>
                                                        12.54%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center item my-2 pb-3">
                                            <div className="d-flex">
                                                <img src={imagesData("svg20")} alt="img" className="ht-30 wd-30 me-2" />
                                                <div className="truncate">
                                                    <h6 className="">Opera</h6>
                                                    <span className="text-muted fs-12">Opera, Inc.</span>
                                                </div>
                                            </div>
                                            <div className="ms-auto my-auto">
                                                <div className="d-flex">
                                                    <span className="me-4 mt-1 fw-semibold fs-16">12,563</span>
                                                    <span className="text-danger">
                                                        <i className="fe fe-trending-down text-danger mx-2 my-auto"></i>
                                                        15.12%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xxl={7} xl={12} lg={12} md={12} sm={12}>
                    <Card className=" custom-card overflow-hidden">
                        <Card.Header className=" border-bottom-0">
                            <div>
                                <h3 className="card-title ">Stater kit Content</h3>
                                <span className="d-block fs-12 mb-0 text-muted"></span>
                            </div>
                        </Card.Header>
                    </Card>
                    <Row>
                        <Col sm={12} lg={12} xl={6}>
                            <Card className="card overflow-hidden">
                                <Card.Header className=" pb-1">
                                    <h3 className="card-title mb-2">Recent Customers</h3>
                                </Card.Header>
                                <Card.Body className="p-0 customers mt-1">
                                    <div className="list-group list-lg-group list-group-flush">
                                        <Link to="#" className="border-0">
                                            <div className="list-group-item list-group-item-action p-3 border-0">
                                                <div className="media mt-0">
                                                    <img
                                                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                        src={imagesData("face2")}
                                                        alt="Image description"
                                                    />
                                                    <div className="media-body flex-fill">
                                                        <div className="d-flex align-items-center">
                                                            <div className="mt-0">
                                                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                    Samantha Melon
                                                                </h5>
                                                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                                                            </div>
                                                            <span className="ms-auto wd-45p fs-14">
                                                                <span className="float-end badge bg-success-transparent">
                                                                    <span className="op-7 text-success fw-semibold">
                                                                        paid{" "}
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className="border-0">
                                            <div className="list-group-item list-group-item-action p-3 border-0">
                                                <div className="media mt-0">
                                                    <img
                                                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                        src={imagesData("face1")}
                                                        alt="Image description"
                                                    />
                                                    <div className="media-body flex-fill">
                                                        <div className="d-flex align-items-center">
                                                            <div className="mt-1">
                                                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                    Allie Grater
                                                                </h5>
                                                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                                                            </div>
                                                            <span className="ms-auto wd-45p fs-14">
                                                                <span className="float-end badge bg-danger-transparent ">
                                                                    <span className="op-7 text-danger fw-semibold">
                                                                        Pending
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className="border-0">
                                            <div className="list-group-item list-group-item-action p-3 border-0">
                                                <div className="media mt-0">
                                                    <img
                                                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                        src={imagesData("face5")}
                                                        alt="Image description"
                                                    />
                                                    <div className="media-body flex-fill">
                                                        <div className="d-flex align-items-center">
                                                            <div className="mt-1">
                                                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                    Gabe Lackmen
                                                                </h5>
                                                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                                                            </div>
                                                            <span className="ms-auto wd-45p  fs-14">
                                                                <span className="float-end badge bg-danger-transparent ">
                                                                    <span className="op-7 text-danger fw-semibold">
                                                                        Pending
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className="border-0">
                                            <div className="list-group-item list-group-item-action p-3 border-0">
                                                <div className="media mt-0">
                                                    <img
                                                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                        src={imagesData("face7")}
                                                        alt="Image description"
                                                    />
                                                    <div className="media-body flex-fill">
                                                        <div className="d-flex align-items-center">
                                                            <div className="mt-1">
                                                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                    Manuel Labor
                                                                </h5>
                                                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                                                            </div>
                                                            <span className="ms-auto wd-45p fs-14">
                                                                <span className="float-end badge bg-success-transparent ">
                                                                    <span className="op-7 text-success fw-semibold">
                                                                        Paid
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className="border-0">
                                            <div className="list-group-item list-group-item-action p-3 border-0">
                                                <div className="media mt-0">
                                                    <img
                                                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                        src={imagesData("face9")}
                                                        alt="Image description"
                                                    />
                                                    <div className="media-body flex-fill">
                                                        <div className="d-flex align-items-center">
                                                            <div className="mt-1">
                                                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                    Hercules Bing
                                                                </h5>
                                                                <p className="mb-0 fs-12 text-muted">User ID: #1754</p>
                                                            </div>
                                                            <span className="ms-auto wd-45p fs-14">
                                                                <span className="float-end badge bg-success-transparent ">
                                                                    <span className="op-7 text-success fw-semibold">
                                                                        Paid
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className="border-0">
                                            <div className="list-group-item list-group-item-action p-3 border-0">
                                                <div className="media mt-0">
                                                    <img
                                                        className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                        src={imagesData("face11")}
                                                        alt="Image description"
                                                    />
                                                    <div className="media-body flex-fill">
                                                        <div className="d-flex align-items-center">
                                                            <div className="mt-1">
                                                                <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                    Manuel Labor
                                                                </h5>
                                                                <p className="mb-0 fs-12 text-muted">User ID: #1234</p>
                                                            </div>
                                                            <span className="ms-auto wd-45p fs-14">
                                                                <span className="float-end badge bg-danger-transparent ">
                                                                    <span className="op-7 text-danger fw-semibold">
                                                                        Pending
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={12} xl={6}>
                            <Card>
                                <Card.Header className="pb-3">
                                    <h3 className="card-title mb-2">MAIN TASKS</h3>
                                </Card.Header>
                                <div className="card-body p-0 customers mt-1">
                                    <div className="">
                                        <label className="p-2 d-flex">
                                            <span className="form-check mb-0 ms-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked1"
                                                />
                                            </span>
                                            <span className="mx-3 my-auto">
                                                accurate information at any given point.
                                            </span>
                                            <span className="ms-auto">
                                                <span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                    Today
                                                </span>
                                            </span>
                                        </label>
                                        <label className="p-2 mt-1 d-flex">
                                            <span className="form-check mb-0 ms-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked01"
                                                />
                                            </span>
                                            <span className="mx-3 my-auto">
                                                sharing the information with clients or stakeholders.
                                            </span>
                                            <span className="ms-auto">
                                                <span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                    Today
                                                </span>
                                            </span>
                                        </label>
                                        <label className="p-2 mt-1 d-flex">
                                            <span className="form-check mb-0 ms-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked2"
                                                />
                                            </span>
                                            <span className="mx-3 my-auto">
                                                Hearing the information and responding .
                                            </span>
                                            <span className="ms-auto">
                                                <span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2 float-end">
                                                    22 hrs
                                                </span>
                                            </span>
                                        </label>
                                        <label className="p-2 mt-1 d-flex">
                                            <span className="form-check mb-0 ms-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked3"
                                                />
                                            </span>
                                            <span className="mx-3 my-auto">
                                                Setting up and customizing your own sales.
                                            </span>
                                            <span className="ms-auto">
                                                {" "}
                                                <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                    1 Day
                                                </span>
                                            </span>
                                        </label>
                                        <label className="p-2 mt-1 d-flex">
                                            <span className="form-check mb-0 ms-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked05"
                                                    defaultChecked
                                                />
                                            </span>
                                            <span className="mx-3 my-auto">
                                                To have a complete 360° overview of sales information, having.
                                            </span>
                                            <span className="ms-auto">
                                                {" "}
                                                <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                    2 Days
                                                </span>
                                            </span>
                                        </label>
                                        <label className="p-2 mt-1 d-flex">
                                            <span className="form-check mb-0 ms-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked07"
                                                />
                                            </span>
                                            <span className="mx-3 my-auto">
                                                sharing the information with clients or stakeholders.
                                            </span>
                                            <span className="ms-auto">
                                                <span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                    Today
                                                </span>
                                            </span>
                                        </label>
                                        <label className="p-2 mt-1 d-flex">
                                            <span className="form-check mb-0 ms-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked06"
                                                    defaultChecked
                                                />
                                            </span>
                                            <span className="mx-3 my-auto">New Admin Launched.</span>
                                        </label>
                                        <label className="p-2 mt-1 d-flex">
                                            <span className="form-check mb-0 ms-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked08"
                                                    defaultChecked
                                                />
                                            </span>
                                            <span className="mx-3 my-auto">
                                                To maximize profits and improve productivity.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Dashboard;
