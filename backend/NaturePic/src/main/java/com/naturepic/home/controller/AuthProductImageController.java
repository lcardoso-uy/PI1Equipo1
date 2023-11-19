package com.naturepic.home.controller;

        import com.naturepic.home.model.ProductImageDto;
        import com.naturepic.home.service.IProductImageService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.security.access.prepost.PreAuthorize;
        import org.springframework.web.bind.annotation.*;

        import java.util.Set;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/authproduct-images")
public class AuthProductImageController {

    private IProductImageService productImageService;

    @Autowired
    public void ProductImageController(IProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @PostMapping("/admin/resource")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> newProductImage(@RequestBody ProductImageDto productImageDto){
        productImageService.addProductImage(productImageDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<ProductImageDto> getProductImageById(@PathVariable Long imageId){
        ProductImageDto productImageDto = productImageService.findProductImageById(imageId);

        if(productImageDto != null) {
            return ResponseEntity.ok(productImageDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProductImage(@PathVariable Long id) {
        boolean deleted = productImageService.deleteProductImage(id);
        if (deleted) {
            return ResponseEntity.ok("Foto de producto eliminado exitosamente.");
        } else {
            return ResponseEntity.status( HttpStatus.NOT_FOUND).body("Foto no encontrada");
        }
    }

    @GetMapping("/by-product/{productId}")
    public ResponseEntity<Set<ProductImageDto>> getProductImagesByProductId(@PathVariable Long productId){
        Set<ProductImageDto> productImageDtos = productImageService.findProductImagesByProductId(productId);

        /*if(!productImageDtos.isEmpty()) {
            return ResponseEntity.ok(productImageDtos);
        } else {
            return ResponseEntity.notFound().build();
        }*/
        return ResponseEntity.ok(productImageDtos);
    }
}
