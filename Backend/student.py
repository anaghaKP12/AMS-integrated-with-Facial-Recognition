from flask import Flask, jsonify, request
import cv2
import os
from flask_cors import CORS
import numpy as np
from PIL import Image
import pymongo
from time import strftime
from datetime import datetime

mongo_uri = "mongodb+srv://anaghakp281:y1F8ti9QMFAmiVoF@cluster0.yclxmwp.mongodb.net/face_recognizer"  # Replace with your MongoDB URI
client = pymongo.MongoClient(mongo_uri)
db = client["face_recognizer"]  # Replace with your database name
student_collection = db["students"]  # Replace with your collection name

app = Flask(__name__)
CORS(app)
current_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the full path to the XML file
xml_file_path = os.path.join(current_dir, 'haarcascade_frontalface_default.xml')

data_dir = os.path.join(current_dir, 'data')
classifier_path = os.path.join(current_dir, "classifier.xml")
attendance_file = os.path.join(current_dir, 'attendance.csv')

def mark_attendance(i, r, n, d):
    print("Inside attendance.csv")
    # print(i, r, n, d)
    with open(attendance_file, "r+", newline="\n") as f:
        myDataList = f.readlines()
        name_list = []
        for line in myDataList:
            entry = line.split(",")
            name_list.append(entry[0])
        if (i not in name_list) and (r not in name_list) and (n not in name_list) and (d not in name_list):
            now = datetime.now()
            d1 = now.strftime("%d/%m/%Y")
            dtString = now.strftime("%H:%M:%S")
            f.writelines(f"{i},{r},{n},{d},{dtString},{d1},Present\n")






@app.route('/api/generate_dataset', methods=['POST'])
def generate_dataset():
    try:
        # print("Hello this is python")
        data = request.json
        id = data.get('id')  
        # print("Received ID: ",id)
        # Extracting ID from the request
        # ----------------------load predefined data-------------------------------------
        face_classifier = cv2.CascadeClassifier(
            xml_file_path)

        def face_cropped(img):
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = face_classifier.detectMultiScale(gray, 1.3, 5)
            # scaling factor=1.3
            # minimum neighbour=5
            for (x, y, w, h) in faces:
                face_cropped = img[y:y+h, x:x+w]
                return face_cropped

        cap = cv2.VideoCapture(0)
        img_id = 0
        while True:
            ret, my_frame = cap.read()
            if face_cropped(my_frame) is not None:
                img_id += 1
                face = cv2.resize(face_cropped(my_frame), (450, 450))
                face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
                file_name_path = f"{data_dir}/user.{id}.{img_id}.jpg"
                cv2.imwrite(file_name_path, face)
                # print("File path:", file_name_path) 
                cv2.putText(face, str(img_id), (50, 50),
                            cv2.FONT_HERSHEY_COMPLEX, 2, (0, 255, 0), 2)
                cv2.imshow("Crooped Face", face)

            if cv2.waitKey(1) == 13 or int(img_id) == 100:
                break
        cap.release()
        cv2.destroyAllWindows()
        return jsonify({'message': 'Generating data sets completed!!!'})
    except Exception as es:
        return jsonify({'error': str(es)}), 500
    
@app.route('/api/train_classifier', methods=['POST'])
def train_classifier():
    try:
        path = [os.path.join(data_dir, file) for file in os.listdir(data_dir)]

        faces = []
        ids = []
        for image in path:
            img = Image.open(image).convert('L')
            image_np = np.array(img, 'uint8')
            id = int(os.path.split(image)[1].split('.')[1])

            faces.append(image_np)
            ids.append(id)

            # Displaying the image during training (optional)
            cv2.imshow("Training", image_np)
            cv2.waitKey(1) == 13

        ids = np.array(ids)

        # Train the classifier
        clf = cv2.face.LBPHFaceRecognizer_create()
        clf.train(faces, ids)
        clf.write(classifier_path)
        cv2.destroyAllWindows()
        
        return jsonify({'message': 'Training completed'})
    except Exception as es:
        return jsonify({'error': str(es)}), 500

@app.route('/api/recognize_face', methods=['POST'])
def recognize_face():
        student_data = {}
        def draw_boundary(img,classifier,scaleFactor,minNeighbor,color,text,clf):
            gray_image=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
            features=classifier.detectMultiScale(gray_image,scaleFactor,minNeighbor)


            coord=[]

            for (x,y,w,h) in features:
                cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),3)
                id,predict=clf.predict(gray_image[y:y+h,x:x+w])
                confidence=int((100*(1-predict/300)))
                student = student_collection.find_one({"std_id": str(id)})
                print("Printing Student : ",student)
                if student:
                    student_data.update({
                        "id": student.get("std_id"),
                        "name": student.get("std_name"),
                        "roll": student.get("roll"),
                        "department": student.get("dep"),
                        "semester": student.get("semester"),
                        "status": 'Present',
                        "div": student.get("div")
                    })

                

                if confidence>77:
                    cv2.putText(img,f"ID:{student_data['id']}",(x,y-75),cv2.FONT_HERSHEY_COMPLEX,0.8,(255,255,255),3)
                    cv2.putText(img,f"Roll:{student_data['roll']}",(x,y-55),cv2.FONT_HERSHEY_COMPLEX,0.8,(255,255,255),3)
                    cv2.putText(img,f"Name:{student_data['name']}",(x,y-30),cv2.FONT_HERSHEY_COMPLEX,0.8,(255,255,255),3)
                    cv2.putText(img,f"Department:{student_data['department']}",(x,y-5),cv2.FONT_HERSHEY_COMPLEX,0.8,(255,255,255),3) 
                    mark_attendance(student_data['id'], student_data['roll'], student_data['name'], student_data['department'])
                    
                else:
                    cv2.rectangle(img,(x,y),(x+w,y+h),(0,0,255),3)
                    cv2.putText(img,"Unknown Face",(x,y-55),cv2.FONT_HERSHEY_COMPLEX,0.8,(255,255,255),3)

                coord=[x,y,w,h]
            return coord


        def recognize(img,clf,faceCascade):
            coord=draw_boundary(img,faceCascade,1.1,10,(255,25,255),"Face",clf)
            return img


        faceCascade=cv2.CascadeClassifier(xml_file_path)
        clf=cv2.face.LBPHFaceRecognizer_create()
        clf.read(classifier_path )


        video_cap=cv2.VideoCapture(0)

        while True:
            ret,img=video_cap.read()
            img=recognize(img,clf,faceCascade)
            cv2.imshow("Welcome To Face Recognition",img)

            if cv2.waitKey(1)==13:
                break

        video_cap.release()
        cv2.destroyAllWindows()
        print("Returning student data: ",student_data)
        return jsonify(student_data)




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Running on 0.0.0.0 to make the server accessible from other devices
