import numpy as np
import cv2
import matplotlib.pyplot as pl
import os

# FUNCTION FOR UPPERERMOST & LOWERMOST DISTANCE


def uppertooth(img):
    img = cv2.imread(img, 0)

    thresh = cv2.adaptiveThreshold(
        img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 2)

    # find contours
    contours, _ = cv2.findContours(
        thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # sort them by area in descending order
    contours = sorted(contours, key=cv2.contourArea, reverse=True)

    # initialize
    uppermost_point = None
    lowermost_point = None
    second_uppermost_point = None
    second_lowermost_point = None

    # go through contours
    for contour in contours:
        # find bounding rectangle of the contour
        x, y, w, h = cv2.boundingRect(contour)

        # find the uppermost and lowermost pts of them
        contour_points = contour[:, 0, :]
        contour_uppermost_point = tuple(
            contour_points[contour_points[:, 1].argmin()])
        contour_lowermost_point = tuple(
            contour_points[contour_points[:, 1].argmax()])

        # check if the uppermost and lowermost points of the contour lie within the bounding rectangle
        if y <= contour_uppermost_point[1] <= y+h:
            # check if the uppermost point of the contour is higher than the current uppermost pt
            if uppermost_point is None or contour_uppermost_point[1] < uppermost_point[1]:
                # set the uppermost point as the new uppermost pt
                uppermost_point = contour_uppermost_point

        if y <= contour_lowermost_point[1] <= y+h:
            # check if the lowermost point of the contour is lower than the current lowermost pt
            if lowermost_point is None or contour_lowermost_point[1] > lowermost_point[1]:
                # set the lowermost point as the new lowermost pt
                lowermost_point = contour_lowermost_point

        if y <= contour_uppermost_point[1] <= y+h:
            if second_uppermost_point is None or contour_uppermost_point[1] < second_uppermost_point[1] < uppermost_point[1]:
                second_uppermost_point = contour_uppermost_point

        if y <= contour_lowermost_point[1] <= y+h:
            if second_lowermost_point is None or contour_lowermost_point[1] > second_lowermost_point[1] > lowermost_point[1]:
                second_lowermost_point = contour_lowermost_point

    # calculate the distance btw the uppermost and lowermost pts
    distance = abs(lowermost_point[1] - uppermost_point[1])
    distance_2 = abs(second_lowermost_point[1] - second_uppermost_point[1])

    # draw BB around the wrench
    x, y, w, h = cv2.boundingRect(contours[0])
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # draw a line btw the uppermost and lowermost pt
    cv2.line(img, second_uppermost_point,
             second_lowermost_point, (255, 0, 0), 2)

    # printing distances
    text = f"Distance 1: {distance}px"
    cv2.putText(img, text, (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    return distance


# FUNCTION FOR SECOND_UPPERERMOST & SECOND_LOWERMOST DISTANCE

def lowertooth(img):
    img = cv2.imread(img, 0)

    thresh = cv2.adaptiveThreshold(
        img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 2)

    # find contours
    contours, _ = cv2.findContours(
        thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # sort them by area in descending order
    contours = sorted(contours, key=cv2.contourArea, reverse=True)

    # initialize
    uppermost_point = None
    lowermost_point = None
    second_uppermost_point = None
    second_lowermost_point = None

    # go through contours
    for contour in contours:
        # find bounding rectangle of the contour
        x, y, w, h = cv2.boundingRect(contour)

        # find the uppermost and lowermost pts of them
        contour_points = contour[:, 0, :]
        contour_uppermost_point = tuple(
            contour_points[contour_points[:, 0].argmin()])
        contour_lowermost_point = tuple(
            contour_points[contour_points[:, 0].argmax()])

        # check if the uppermost and lowermost points of the contour lie within the bounding rectangle
        if y <= contour_uppermost_point[1] <= y+h:
            # check if the uppermost point of the contour is higher than the current uppermost pt
            if uppermost_point is None or contour_uppermost_point[1] < uppermost_point[1]:
                # set the uppermost point as the new uppermost pt
                uppermost_point = contour_uppermost_point

        if y <= contour_lowermost_point[1] <= y+h:
            # check if the lowermost point of the contour is lower than the current lowermost pt
            if lowermost_point is None or contour_lowermost_point[1] > lowermost_point[1]:
                # set the lowermost point as the new lowermost pt
                lowermost_point = contour_lowermost_point

        if y <= contour_uppermost_point[1] <= y+h:
            if second_uppermost_point is None or contour_uppermost_point[1] < second_uppermost_point[1] < uppermost_point[1]:
                second_uppermost_point = contour_uppermost_point

        if y <= contour_lowermost_point[1] <= y+h:
            if second_lowermost_point is None or contour_lowermost_point[1] > second_lowermost_point[1] > lowermost_point[1]:
                second_lowermost_point = contour_lowermost_point

    # calculate the distance btw the uppermost and lowermost pts
    distance = abs(lowermost_point[1] - uppermost_point[1])
    distance_2 = abs(second_lowermost_point[1] - second_uppermost_point[1])

    # draw BB around the wrench
    x, y, w, h = cv2.boundingRect(contours[0])
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # draw a line btw the uppermost and lowermost pt
    cv2.line(img, second_uppermost_point,
             second_lowermost_point, (255, 0, 0), 2)

    # printing distances
    text_2 = f"Distance 2: {distance_2}px"
    cv2.putText(img, text_2, (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

    return distance_2


# FUNCTION FOR MATCHING THE SHAPE

def match(img1, img2='frame_0.jpg'):
    img1 = cv2.imread(img1)
    img2 = cv2.imread(img2)

    gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    # initiate ORB detector
    orb = cv2.ORB_create()

    # find keypts and descriptors with ORB
    kp1, des1 = orb.detectAndCompute(gray1, None)
    kp2, des2 = orb.detectAndCompute(gray2, None)

    # create BFMatcher object
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

    # match descriptors
    matches = bf.match(des1, des2)

    # sort matches by score
    matches = sorted(matches, key=lambda x: x.distance)

    # draw top matches
    img_matches = cv2.drawMatches(
        img1, kp1, img2, kp2, matches[:20], None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)

    # check if images match
    if len(matches) > 135:
        return "accepted"
    else:
        return "rejected"


# MAIN FUNCTION

def driver(img):
    matchres = match(img)

    if matchres == "accepted":

        img1 = "frame_0.jpg"
        upper = uppertooth(img)
        upper1 = uppertooth(img1)
        if (upper - upper1) < 10 and (upper-upper1 > -10):
            lower = lowertooth(img)
            lower1 = lowertooth(img1)
            if (lower - lower1) < 10 and (lower-lower1 > -10):
                return True
            else:
                return False
        else:
            return False
    else:
        return False
