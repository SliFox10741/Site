// document.addEventListener('DOMContentLoaded', function() {
//     const filters = document.querySelector('.filters');
//     const toggleFiltersButton = document.createElement('button');
//     toggleFiltersButton.textContent = 'Фильтры';
//     toggleFiltersButton.classList.add('filter-toggle-button');
//     document.body.insertBefore(toggleFiltersButton, filters);

//     toggleFiltersButton.addEventListener('click', function() {
//         filters.classList.toggle('visible');
//     });
// });

// // CSS для кнопки фильтров
// const style = document.createElement('style');
// style.textContent = `
//     .filters {
//         display: none;
//     }

//     .filters.visible {
//         display: block;
//     }

//     .filter-toggle-button {
//         display: none;
//         background-color: #e25d67;
//         color: white;
//         border: none;
//         padding: 10px;
//         cursor: pointer;
//         margin-bottom: 20px;
//         font-size: 16px;
//     }

//     @media (max-width: 768px) {
//         .filters {
//             display: none;
//             position: absolute;
//             top: 100px;
//             left: 0;
//             right: 0;
//             background-color: white;
//             z-index: 1000;
//              box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
//         }

//         .filter-toggle-button {
//             display: block;
//         }
//     }
// `;
// document.head.appendChild(style);
