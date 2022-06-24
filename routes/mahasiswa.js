const express = require('express')
const router = express.Router()
const {body, validationResult, check} = require('express-validator') 

const connection = require('../library/database')

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM mahasiswa ORDER BY id ASC', (err, rows) => {
        if(err){
            req.flash(err)
            res.render('mahasiswa', {
                data: ''
            })
        } else{
            res.render('mahasiswa/index', {
                data:rows
            })
        }
    })
})

// Halaman tambah mahasiswa
router.get('/add-mahasiswa', (req, res, next) => {
    res.render('mahasiswa/add-mahasiswa', {
      nama: ''  ,
      jenisKelamin: ''  ,
      tempatLahir: ''  ,
      tanggalLahir: ''  ,
      kewarganegaraan: ''  ,
      agama: ''  ,
      noHP: ''  ,
      email: ''  ,
      instagram: ''  ,
    })
})

// Tambah mahasiswa
router.post('/tambah', 
[
    check('email', 'Email tidak valid').isEmail(),
    check('NoHP', 'Nomor HP tidak valid').isMobilePhone('id-ID')
],
(req, res, next) => {
    const errors = validationResult(req)
    let nama = req.body.nama
    let jenisKelamin = req.body.jenisKelamin
    let tempatLahir = req.body.tempatLahir
    let tanggalLahir = req.body.tanggalLahir
    let kewarganegaraan = req.body.kewarganegaraan
    let agama = req.body.agama
    let noHP = req.body.noHP
    let email = req.body.email
    let instagram = req.body.instagram

    if(!errors.isEmpty()){
        let dataForm = {
            nama: nama,
            jenisKelamin: jenisKelamin,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            kewarganegaraan: kewarganegaraan,
            agama: agama,
            noHP: noHP,
            email: email,
            instagram: instagram,
        }

        connection.query('INSERT INTO mahasiswa SET ?', dataForm, (err, result) => {
            if(err){
                req.flash('error', err)
                res.render('mahasiswa/add-mahasiswa', {
                    nama: dataForm.nama,
                    jenisKelamin: dataForm.jenisKelamin,
                    tempatLahir: dataForm.tempatLahir,
                    tanggalLahir: dataForm.tanggalLahir,
                    kewarganegaraan: dataForm.kewarganegaraan,
                    agama: dataForm.agama,
                    noHP: dataForm.noHP,
                    email: dataForm.email,
                    instagram: dataForm.instagram,
                    
                })
            } else {
                req.flash('msg', 'Data berhasil disimpan')
                res.redirect('/')
            }
        })
    }
})

// Halaman edit mahasiswa
router.get('/edit-mahasiswa/(:id)', (req, res, next) => {
    let id = req.params.id

    connection.query('SELECT * FROM mahasiswa WHERE id=' + id, (err, rows, fields) => {
        if(err){
            throw(err)
        }
        if(rows.length <= 0){
            req.flash('err', `Data dengan ID ${id} tidak ditemukan`)
            res.redirect('/mahasiswa')

        } else {
            res.render('mahasiswa/edit-mahasiswa', {
                id : rows[0].id,
                nama: rows[0].nama,
                jenisKelamin : rows[0].jenisKelamin,
                tempatLahir : rows[0].tempatLahir,
                tanggalLahir : rows[0].tanggalLahir,
                kewarganegaraan : rows[0].kewarganegaraan,
                agama : rows[0].agama,
                noHP : rows[0].noHP,
                email : rows[0].email,
                instagram : rows[0].instagram,

            })
        }
        
    })
})

// Ubah Data
router.post('/ubah-data/:id', (req, res, next) => {
    let id = req.params.id
    let nama = req.body.nama
    let jenisKelamin = req.body.jenisKelamin
    let tempatLahir = req.body.tempatLahir
    let tanggalLahir = req.body.tanggalLahir
    let kewarganegaraan = req.body.kewarganegaraan
    let agama = req.body.agama
    let noHP = req.body.noHP
    let email = req.body.email
    let instagram = req.body.instagram

    let errors = false

    if(!errors){
        let dataForm = {

            nama: nama,
            jenisKelamin: jenisKelamin,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            kewarganegaraan: kewarganegaraan,
            agama: agama,
            noHP: noHP,
            email: email,
            instagram: instagram,
        }

        connection.query(`UPDATE mahasiswa SET ? WHERE id = ${id}`, dataForm, (err, result) => {
            if(err){
                req.flash('error', err)
                res.render('mahasiswa/edit-mahasiswa', {
                    id : req.params.id,
                    nama: dataForm.nama,
                    jenisKelamin: dataForm.jenisKelamin,
                    tempatLahir: dataForm.tempatLahir,
                    tanggalLahir: dataForm.tanggalLahir,
                    kewarganegaraan: dataForm.kewarganegaraan,
                    agama: dataForm.agama,
                    noHP: dataForm.noHP,
                    email: dataForm.email,
                    instagram: dataForm.instagram,
                })
            } else {
                req.flash('success', 'Data berhasil diubah')
                res.redirect('/')
            }
        })
    }
})

// Hapus data
router.get('/delete/(:id)', (req, res, next) => {
    let id = req.params.id

    connection.query(`DELETE FROM mahasiswa WHERE id = ${id}`, (err, result) => {
        if (err) {
            req.flash('error', err)
            res.redirect('/')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            res.redirect('/')
            }
    })
})

// Detail Mahasiswa
router.get('/detail/(:id)', (req, res, next) => {
    let id = req.params.id
    connection.query('SELECT * FROM mahasiswa WHERE id=' + id, (err, rows, fields) => {
        if(err){
            throw(err)
        }
        if(rows.length <= 0){
            req.flash('err', `Data dengan ID ${id} tidak ditemukan`)
            res.redirect('/mahasiswa')

        } else {
            res.render('mahasiswa/detail', {
                id : rows[0].id,
                nama: rows[0].nama,
                jenisKelamin : rows[0].jenisKelamin,
                tempatLahir : rows[0].tempatLahir,
                tanggalLahir : rows[0].tanggalLahir,
                kewarganegaraan : rows[0].kewarganegaraan,
                agama : rows[0].agama,
                noHP : rows[0].noHP,
                email : rows[0].email,
                instagram : rows[0].instagram,

            })
        }
    })
})

module.exports = router;
