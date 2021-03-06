package com.fastfooddelivery.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fastfooddelivery.domain.Pais;

import com.fastfooddelivery.repository.PaisRepository;
import com.fastfooddelivery.web.rest.errors.BadRequestAlertException;
import com.fastfooddelivery.web.rest.util.HeaderUtil;
import com.fastfooddelivery.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Pais.
 */
@RestController
@RequestMapping("/api")
public class PaisResource {

    private final Logger log = LoggerFactory.getLogger(PaisResource.class);

    private static final String ENTITY_NAME = "pais";

    private final PaisRepository paisRepository;

    public PaisResource(PaisRepository paisRepository) {
        this.paisRepository = paisRepository;
    }

    /**
     * POST  /pais : Create a new pais.
     *
     * @param pais the pais to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pais, or with status 400 (Bad Request) if the pais has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pais")
    @Timed
    public ResponseEntity<Pais> createPais(@RequestBody Pais pais) throws URISyntaxException {
        log.debug("REST request to save Pais : {}", pais);
        if (pais.getId() != null) {
            throw new BadRequestAlertException("A new pais cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pais result = paisRepository.save(pais);
        return ResponseEntity.created(new URI("/api/pais/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pais : Updates an existing pais.
     *
     * @param pais the pais to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pais,
     * or with status 400 (Bad Request) if the pais is not valid,
     * or with status 500 (Internal Server Error) if the pais couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pais")
    @Timed
    public ResponseEntity<Pais> updatePais(@RequestBody Pais pais) throws URISyntaxException {
        log.debug("REST request to update Pais : {}", pais);
        if (pais.getId() == null) {
            return createPais(pais);
        }
        Pais result = paisRepository.save(pais);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pais.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pais : get all the pais.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pais in body
     */
    @GetMapping("/pais")
    @Timed
    public ResponseEntity<List<Pais>> getAllPais(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Pais");
        Page<Pais> page = paisRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pais");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pais/:id : get the "id" pais.
     *
     * @param id the id of the pais to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pais, or with status 404 (Not Found)
     */
    @GetMapping("/pais/{id}")
    @Timed
    public ResponseEntity<Pais> getPais(@PathVariable Long id) {
        log.debug("REST request to get Pais : {}", id);
        Pais pais = paisRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pais));
    }

    /**
     * DELETE  /pais/:id : delete the "id" pais.
     *
     * @param id the id of the pais to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pais/{id}")
    @Timed
    public ResponseEntity<Void> deletePais(@PathVariable Long id) {
        log.debug("REST request to delete Pais : {}", id);
        paisRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
