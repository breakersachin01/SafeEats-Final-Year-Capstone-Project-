import React, { useState } from "react";

const Scanner = () => {
  const [nutritionData, setNutritionData] = useState(null);
  const [safetyStatus, setSafetyStatus] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);

  const calculateSafetyScore = (calories, proteins, carbs) => {
    const proteinRatio = (proteins / calories) * 100;
    const carbRatio = (carbs / calories) * 100;
    const riskFactor = 0; 

    const safetyScore = proteinRatio - carbRatio - riskFactor;
    return safetyScore;
  };

  const checkNutritionSafety = (calories, proteins, carbs) => {
    const isCaloriesSafe = calories <= 200;
    const isProteinsSafe = proteins >= 10;
    const isCarbsSafe = carbs <= 30;

    return isCaloriesSafe && isProteinsSafe && isCarbsSafe;
  };

  const handleBarcodeImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Replace this with actual barcode scanning logic
      const mockNutritionData = {
        calories: 245,
        proteins: 12,
        carbs: 30
      }; 
      setNutritionData(mockNutritionData);

      const safetyScore = calculateSafetyScore(
        mockNutritionData.calories,
        mockNutritionData.proteins,
        mockNutritionData.carbs
      );
      const isSafe = checkNutritionSafety(
        mockNutritionData.calories,
        mockNutritionData.proteins,
        mockNutritionData.carbs
      );
      setSafetyStatus(isSafe);
    }
  };

  const handleRecipeImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative m-5">
      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 relative">
          <div className="flex items-center justify-center mb-6">
            <i className="fas fa-camera text-3xl text-black mr-4"></i>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleRecipeImageUpload} 
              className="hidden" 
              id="recipeFileInput" 
            />
            <label 
              htmlFor="recipeFileInput" 
              className="bg-black text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-800"
            >
              Scan Recipe
            </label>
          </div>
          <div className="relative">
            {recipeImage && (
              <img 
                src={recipeImage} 
                alt="Recipe" 
                className="absolute top-0 right-0 w-14 h-14 object-cover rounded-lg shadow-md m-0.5" 
              />
            )}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Recipe Details:</h3> 
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <i className="fas fa-barcode text-3xl text-black mr-4"></i>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleBarcodeImageUpload} 
              className="hidden" 
              id="barcodeFileInput" 
            />
            <label 
              htmlFor="barcodeFileInput" 
              className="bg-black text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-800"
            >
              Scan Barcode
            </label>
          </div>

          {nutritionData && (
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Scan Results:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories</span>
                  <span className="font-medium">{nutritionData.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-medium">{nutritionData.proteins}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs</span>
                  <span className="font-medium">{nutritionData.carbs}g</span>
                </div>
                <div className="mt-4 flex items-center">
                  <i className={`fas ${safetyStatus ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} mr-2`}></i>
                  <span className={`font-medium ${safetyStatus ? 'text-green-500' : 'text-red-500'}`}>
                    {safetyStatus ? 'Safe to eat' : 'Not safe to eat'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;