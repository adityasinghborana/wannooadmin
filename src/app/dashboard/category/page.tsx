'use client'
import Container from '@/app/ui/dashboard/container/Container'
import SCustomImageUpload from '@/app/ui/dashboard/SingleImageLibrary/SCustomImageUpload'
import Modal from '@/components/model'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GetAllImages, AddTourTypes, GetAllTourTypes, UpdateTourTypes, DeleteTourTypes } from '@/lib/services'
import { ChangeEvent, useEffect, useState } from 'react'

const Category: React.FC = () => {
  const [categoryName, setCategoryName] = useState('')
  const [imagepath, setImagePath] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [categoryList, setCategoryList] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null) // For Update
  const [deleteId, setDeleteId] = useState<string | null>(null) // For Delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const data = await GetAllTourTypes()
    setCategoryList(data)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (selectedId) {
        // Update Tour Type
        await UpdateTourTypes(selectedId, {
          name: categoryName,
          image: imagepath
        })
      } else {
        // Add New Tour Type
        await AddTourTypes({
          name: categoryName,
          image: imagepath
        })
      }

      setIsSuccess(true)
      fetchCategories()
      closeModal()
    } catch (error) {
      setIsSuccess(false)
    } finally {
      setIsModalOpen(true)
    }
  }

  const handleDelete = async () => {
    try {
      await DeleteTourTypes(deleteId as string)
      fetchCategories()
    } catch (error) {
      console.error("Error deleting category", error)
    } finally {
      setIsDeleteModalOpen(false)
    }
  }

  const openModalForEdit = (category: any) => {
    setSelectedId(category.id)
    setCategoryName(category.cityTourType)
    setImagePath(category.image)
  }

  const openModalForDelete = (id: string) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCategoryName('')
    setImagePath('')
    setSelectedId(null)
  }

  return (
    <Container>
      <div
        className='bg-white p-8 shadow-md w-full rounded-3xl mt-12'
        style={{ height: 'calc(100vh - 10rem)' }}
      >
        <h2 className='text-2xl text-black font-bold mb-6 text-center'>
          {selectedId ? 'Update Category' : 'Add Category'}
        </h2>
        <div className='flex flex-row gap-8'>
          {/* Left Side Form */}
          <div className='w-1/3'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
              {/* Image Upload */}
              <SCustomImageUpload
                onImageSelect={setImagePath}
                Images={GetAllImages}
              />

              {/* Category Name Input */}
              <div className='mb-4'>
                <label className='block text-gray-700 capitalize'>
                  Category Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={categoryName}
                  onChange={handleChange}
                  className='w-full text-field'
                />
              </div>

              {/* Submit Button */}
              <div className='flex'>
                <button
                  type='submit'
                  className='bg-primary text-white py-2 px-4 rounded-full hover:bg-purple-400 w-96'
                >
                  {selectedId ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Category List */}
          <div className='w-2/3'>
            <h3 className='text-xl font-bold mb-4'>Category List</h3>
            <ScrollArea className="h-[700px] w-full rounded-md border p-4">
            <div className=''>
              {categoryList.length > 0 ? (
                categoryList.map((category, index) => (
               
                  <div key={index} className='p-2 border-b flex justify-between items-center'>
                    <div>
                      <p><strong>Name:</strong> {category.cityTourType}</p>
                      <p><strong>Image:</strong> 
                        <img 
                          src={`${process.env.NEXT_PUBLIC_URL}${category.image}`} 
                          className='w-20 h-20 rounded-lg'
                        />
                      </p>
                    </div>
                    <div>
                      <button
                        className='text-blue-500 mr-3'
                        onClick={() => openModalForEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className='text-red-500'
                        onClick={() => openModalForDelete(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>



                ))
              ) : (
                <p>No categories found.</p>
              )}
            </div>
            </ScrollArea>
            
          </div>
        </div>
      </div>

      {/* Success/Error Modal */}
      {isModalOpen && (
        <Modal
          isOpen={true}
          title={isSuccess ? 'Success' : 'Error'}
          message={
            isSuccess
              ? 'Category saved successfully!'
              : 'Failed to save category.'
          }
          onClose={closeModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal
          isOpen={true}
          title="Confirm Delete"
          message="Are you sure you want to delete this category?"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </Container>
  )
}

export default Category
