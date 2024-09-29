'use client'
import { useState, useEffect } from 'react';
import { storage } from '../../lib/firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaTrash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import CustomCarInput from '@/components/CustomCarInput';
import { carDetails } from '@/services/api';

interface FormData {
  carModel: string;
  price: number;
  phoneNumber: string;
  maxPictures: number;
  city: string;
  pictures: (File | null)[];
}

const CarForm = () => {
  const initialFormData: FormData = {
    carModel: '',
    price: 0,
    phoneNumber: '',
    city: '',
    maxPictures: 0,
    pictures: [],
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [uploadedPictures, setUploadedPictures] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem('id'));
    }
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'maxPictures') {
      const maxPics = parseInt(value, 10);
      setFormData({
        ...formData,
        [name]: maxPics,
        pictures: Array(maxPics).fill(null),
      });
    } else if (name.startsWith('picture')) {
      const index = parseInt(name.split('-')[1], 10);
      const updatedPictures = [...formData.pictures];
      const picture = (e.target as HTMLInputElement).files?.[0] || null;
      updatedPictures[index] = picture;
      setFormData({
        ...formData,
        pictures: updatedPictures,
      });

      if (picture) {
        try {
          const storageRef = ref(storage, `pictures/${picture.name}`);
          await uploadBytes(storageRef, picture);
          const downloadURL = await getDownloadURL(storageRef);
          setUploadedPictures((prevState) => [...prevState, downloadURL]);
        } catch (error) {
          console.error('Error uploading picture:', error);
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDeletePicture = async (url: string) => {
    const pictureRef = ref(storage, url);
    await deleteObject(pictureRef);
    setUploadedPictures(uploadedPictures.filter((pic) => pic !== url));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('carModel', formData.carModel);
    form.append('price', formData.price.toString());
    form.append('phoneNumber', formData.phoneNumber);
    form.append('city', formData.city);
    form.append('maxPictures', formData.maxPictures.toString());

    formData.pictures.forEach((file, index) => {
      if (file) {
        form.append(`picture${index + 1}`, file);
      }
    });

    try {
      await carDetails({
        userId: userId,
        formData: formData,
        pictures: uploadedPictures,
      });
      setFormData(initialFormData);
      setUploadedPictures([]);
      toast.success('Car Data Saved Successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error Uploading Data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap p-4 items-center justify-between min-h-screen w-full">
      <Toaster />

      <form onSubmit={handleSubmit} className="max-w-2xl  w-full mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className='md:text-4xl text-2xl text-center mb-10 font-semibold' >Fill the deatils</h1>
        <div className="mb-4 md:flex-row flex-col flex items-center md:gap-6 gap-4 w-full">
          <CustomCarInput
            type="text"
            label="Car Model"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            placeholder="Enter car model"
            minLength={3}
            isRequired={true}
          />
          <CustomCarInput
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            isRequired={true}
          />
        </div>

        <div className="mb-4">
          <CustomCarInput
            type="text"
            label="Phone Number"
            name="phoneNumber"
            minLength={11}
            maxLength={11}
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            isRequired={true}
          />
        </div>

        <div className="mb-4">
          <CustomCarInput
            type="number"
            name="price"
            label="Price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter car price"
            isRequired={true}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="maxPictures" className="mb-2 text-sm font-medium text-gray-800">
            Max Number of Pictures
          </label>
          <select
            name="maxPictures"
            id="maxPictures"
            required
            value={formData.maxPictures}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 outline-none rounded-md shadow-sm py-2.5 px-3 focus:ring-2 focus:ring-purple focus:border-purple"
          >
            {Array.from({ length: 10 }, (_, i) => i).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {formData.pictures.map((_, index) => (
          <div className="mb-4 flex items-center gap-4" key={index}>
            <div className='w-1/2'>
              <p>Upload Image {index + 1}</p>
              <input
                type="file"
                name={`picture-${index}`}
                id={`picture-${index}`}
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {uploadedPictures[index] && (
              <div className='w-fit relative'>
                <img
                  src={uploadedPictures[index]}
                  alt={`Uploaded Picture ${index + 1}`}
                  className="w-40 h-40 object-contain rounded-md"
                />
                {uploadedPictures.map((url, i) => (
                  <button key={i}
                    onClick={() => handleDeletePicture(url)}
                    type="button"
                    className="absolute top-3 right-0 bg-red-600 text-white rounded-full p-1 m-1 hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mb-4">
          <button type="submit" className="w-full py-2 px-4 bg-purple text-white rounded-md shadow-sm ">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
