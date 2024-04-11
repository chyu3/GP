/*
Task 8 - What can you say about the result of thresholding for each channel – is it different and why?

1. Red Channel: Thresholding the red channel isolates areas of high red intensity. For example, in an image containing objects with strong red hues, the red channel thresholding will highlight those areas. Conversely, areas with lower red intensity will appear darker or black in the thresholded image.

2. Green Channel: Similarly, thresholding the green channel highlights areas with high green intensity. This is useful for images where green is a dominant color. Regions with high green intensity will appear brighter, while regions with lower green intensity will be darker or black in the thresholded image.

3. Blue Channel: Thresholding the blue channel highlights areas with high blue intensity. In images containing blue objects or backgrounds, the blue channel thresholding will emphasize those areas. Similarly, regions with lower blue intensity will be darker or black in the thresholded image.


Implementing image thresholding using each color channel and extending the functionality to include pixelation, several challenges were encountered. The difficulty revolved around memory management and computational efficiency. The pixelation algorithm, designed to average the RGB values of image blocks, consumed significant memory resources, leading to program termination in cases of large images or small pixelation sizes.

Through iterative debugging, optimizations were explored to address memory overflow and computational inefficiency. These included implementing stricter memory management practices, optimizing nested loops within the pixelation algorithm, and testing the function with different image sizes and pixelation levels. Despite seatbacks, the optimizations significantly improved the performance and stability of the pixelation feature. 

While progress was made in enhancing the image processing capabilities, achieving the original project goals within the designated timeframe challenged. The project scope expanded as new features were integrated, necessitating additional time for thorough testing and debugging. 

The extension, focusing on face detection and counting, represents a unique addition to the image processing application. Leveraging object detection algorithms, the extension enhances the application's functionality by providing real-time face detection and counting capabilities. 

Moving forward, a more structured approach to project management could facilitate smoother development and timely completion of tasks. Implementing agile methodologies, such as sprint planning and regular retrospectives, would enable better tracking of progress and identification of potential bottlenecks. Additionally, adopting modular design principles and code refactoring practices could enhance code maintainability and facilitate future extensions or modifications.

In conclusion, while the image processing application encountered challenges during development, including memory management issues and timeline constraints, the iterative development process enabled the resolution of technical hurdles and the implementation of innovative features. By optimizing algorithms and adopting agile development practices, the application achieved a balance between functionality and performance. Moving forward, continued refinement of codebase and project management practices will ensure the application remains scalable, efficient, and adaptable to evolving user needs.



*/